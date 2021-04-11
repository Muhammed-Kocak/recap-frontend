import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CarDtoService } from 'src/app/services/carDtoService/car-dto.service';
import { CreditCardService } from 'src/app/services/creditCardService/credit-card.service';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  findeksScore: any;
  rental: Rental;
  carDetail: CarDto
  amountOfPayment: number = 0;
  userDetail!: UserDetail
  creditCardForm!: FormGroup;
  creditCards?: CreditCard[];
  selectedCreditCard?: CreditCard = undefined;
  paymentSuccessfull!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carDtoService: CarDtoService,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private authService: AuthService,
    private creditCardService: CreditCardService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private findeksService: FindeksService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["rental"]) {
        this.rental = JSON.parse(params['rental']);
        this.createCreditCardForm();
        this.getUserDetailFromStore();
        this.getCarDetail();
      }
    })
  }

  getUserDetailFromStore() {
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        this.userDetail = userDetail;
        let eMail = this.localStorageService.get("email");
        if (this.authService.isAuthenticated(eMail) && this.creditCardService.getAllByCustomerId(userDetail.customerId)) {
          // this.getCreditCardsByCustomerId(userDetail.customerId);
        }
      }
    });
  }

  getCreditCardsByCustomerId(customerId: number) {
    this.creditCardService
      .getAllByCustomerId(customerId)
      .subscribe((response) => {
        if (!response.data.length) return;
        this.creditCards = response.data;
      });
  }


  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      nameSurname: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvc: ['', Validators.required],
      cardType: ['Mastercard', Validators.required],
    });
  }

  fillCardInformation(selectedCreditCard: CreditCard) {
    this.selectedCreditCard = selectedCreditCard;
    if (this.selectedCreditCard)
      this.creditCardForm.patchValue({ ...this.selectedCreditCard });
    else this.creditCardForm.reset({ cardType: 'Mastercard' });
  }

  getCarDetail() {
    this.carDtoService.getCarDetailsById(this.rental.carId).subscribe(response => {
      this.carDetail = response.data;
      this.paymentCalculator();
    })
  }

  paymentCalculator() {

    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetail.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
      }
    }
  }

  payment() {
    this.findeksCalcUser();
    if (!this.creditCardForm.valid) return;
    let rental: Rental = this.rental;
    this.paymentService.payment(rental, this.amountOfPayment).subscribe(
      (response) => {
        this.paymentSuccessfull = response.success;
        this.toastrService.success(response.message, "İşlem Başarılı!");
        if (response.success == true) {
          this.addRental();
        }
        this.askSaveCreditCard();
      },
      (reponseError) => {
        console.log(reponseError)
        this.paymentSuccessfull = false;
      });
  }

  findeksCalcUser() {
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        this.findeksGetByCustomerId(userDetail.customerId);
        if (this.findeksScore >= this.carDetail.minFindeksScore) {
          return;
        } else {
          this.toastrService.warning("Findeks Puanınız Yetersiz", "ARACI KİRALAYAMAZSINIZ!")
          this.toastrService.info("Arabalar Sayfasına Aktarılıyorsunuz", "Bilgi")
          setTimeout(() => { this.router.navigate(['/cars']); }, 3000);
        }
      }
    });
  }

  findeksGetByCustomerId(customerId: number) {
    this.findeksService.getByCustomerId(customerId).subscribe(response => {
      this.findeksScore = response.data;
    })
  }

  addRental() {
    let rental: Rental | undefined = this.rentalService.rentalCheckout;

    if (!rental) {
      this.toastrService.error('Bir sorun oluştu.');
      return;
    }

    this.rentalService
      .add(rental)
      .subscribe((response) => this.toastrService.success(response.message));
  }

  askSaveCreditCard() {
    let userDto:any
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        userDto=userDetail;
        if (!this.selectedCreditCard)
          if (window.confirm('Kredi kartınızı kaydetmek ister misiniz?')) {
            let newCreditCard: CreditCard = {
              customerId: userDto.customerId,
              ...this.creditCardForm.value,
              cvc: this.creditCardForm.get('cvc')?.value.toString(),
            };
            this.saveCreditCard(newCreditCard);
          }
      }
    })
  }

  saveCreditCard(creditCard: CreditCard) {
    this.creditCardService.add(creditCard).subscribe((response) => {
      this.toastrService.success(response.message);
    }, (responseError) => {
      console.log(responseError)
      this.toastrService.error(responseError.error.message);
    })
  }
}
