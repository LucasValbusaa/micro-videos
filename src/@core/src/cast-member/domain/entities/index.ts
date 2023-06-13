export * from "./cast-member";

interface Payment {
  makePayment(): void;
}

interface CancelablePayment extends Payment {
  cancelPayment(): void;
}

interface VerifiablePayment extends Payment {
  checkPaymentStatus(): void;
}

class CreditCard implements CancelablePayment {
  makePayment(): void {
    // Implementação do pagamento com cartão de crédito
  }

  cancelPayment(): void {
    // Implementação do cancelamento do pagamento com cartão de crédito
  }
}

class PayPal implements VerifiablePayment {
  makePayment(): void {
    // Implementação do pagamento com PayPal
  }

  checkPaymentStatus(): void {
    // Implementação da verificação do status do pagamento com PayPal
  }
}
