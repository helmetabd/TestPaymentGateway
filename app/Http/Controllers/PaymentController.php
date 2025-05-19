<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Str;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\Invoice;
use Xendit\Invoice\InvoiceApi;

class PaymentController extends Controller
{
    public function __construct()
    {
        Configuration::setXenditKey(env('XENDIT_API_KEY'));
    }
    public function store(Request $request)
    {
        $apiInstance = new InvoiceApi();
        $data = new CreateInvoiceRequest([
            'external_id' => (string) Str::uuid(),
            'amount' => $request->amount,
            'payer_email' => $request->payer_email,
            'description' => $request->description,
            'success_redirect_url' => 'arjuna.genah.net',
            'failure_redirect_url' => 'arjuna.genah.net',
            'currency' => 'IDR',
        ]);

        try {
            $invoice = $apiInstance->createInvoice($data);
            $payment = new Payment;
            $payment->fill([
                'checkout_link' => $invoice->getInvoiceUrl(),
                'external_id' => $invoice->getExternalId(),
                'status' => $invoice->getStatus(),
            ]);
            $payment->save();
            return response()->json($payment['checkout_link'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
