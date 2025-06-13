<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->setupMidtrans();
    }

    private function setupMidtrans()
    {
        $serverKey = config('midtrans.server_key');
        
        if (empty($serverKey)) {
            throw new \RuntimeException('Midtrans server key is not configured in .env');
        }

        Config::$serverKey = $serverKey;
        Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = config('midtrans.is_sanitized', true);
        Config::$is3ds = config('midtrans.is_3ds', true);
        
        // Untuk development (disable SSL verification)
        Config::$curlOptions = [
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json'
            ]
        ];
    }

public function upgradePage()
{
    return inertia('Upgrade', [
        'clientKey' => config('midtrans.client_key'),
        'isProduction' => config('midtrans.is_production', false),
        'user' => Auth::user()
    ]);
}

public function createTransaction(Request $request)
{
    try {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        $orderId = 'UPG-' . $user->id . '-' . now()->timestamp;
        $grossAmount = 100000;

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '08123456789',
            ],
            'item_details' => [
                [
                    'id' => 'premium_package',
                    'price' => $grossAmount,
                    'quantity' => 1,
                    'name' => 'Premium Package Upgrade',
                    'category' => 'Digital Service',
                ]
            ],
            'callbacks' => [
                'finish' => url('/payment/callback')
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'token' => $snapToken,
            'order_id' => $orderId
        ]);

    } catch (\Exception $e) {
        Log::error('Midtrans Error: ' . $e->getMessage());
        return response()->json([
            'error' => 'Payment processing failed',
            'message' => $e->getMessage()
        ], 500);
    }
}

    public function handleCallback(Request $request)
    {
        $payload = $request->all();
        Log::info('Payment callback received:', $payload);

        try {
            if (!isset($payload['transaction_status'])) {
                throw new \Exception('Invalid callback: transaction_status missing');
            }

            $status = $payload['transaction_status'];
            $email = $payload['email'] ?? null;
            $orderId = $payload['order_id'] ?? null;

            // Status yang dianggap sukses
            $successStatuses = ['settlement', 'capture'];

            if (in_array($status, $successStatuses)) {
                if (!$email) {
                    throw new \Exception('Email not provided in callback');
                }

                $user = User::where('email', $email)->first();

                if (!$user) {
                    throw new \Exception('User not found with email: ' . $email);
                }

                if ($user->package_type === 'basic') {
                    $user->package_type = 'premium';
                    $user->save();

                    Log::info('User upgraded successfully', [
                        'user_id' => $user->id,
                        'order_id' => $orderId,
                        'email' => $email
                    ]);

                    // Kirim notifikasi ke user jika diperlukan
                    // ...
                }

                return response()->json(['status' => 'success']);
            }

            Log::info('Payment not yet completed', ['status' => $status]);
            return response()->json(['status' => 'pending']);

        } catch (\Exception $e) {
            Log::error('Callback processing failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function handleWebhook(Request $request)
{
    $payload = $request->all();
    Log::info('Webhook received:', $payload);

    try {
        // Verifikasi signature untuk produksi
        if (config('midtrans.is_production')) {
            $signatureKey = $request->header('X-Midtrans-Signature');
            $computedSignature = hash('sha512', 
                $payload['order_id'] . 
                $payload['status_code'] . 
                $payload['gross_amount'] . 
                config('midtrans.server_key'));

            if ($signatureKey !== $computedSignature) {
                Log::error('Invalid webhook signature');
                return response()->json(['status' => 'invalid signature'], 401);
            }
        }

        // Pastikan data yang diperlukan ada
        if (!isset($payload['transaction_status'])) {
            throw new \Exception('Transaction status missing');
        }

        // Tangani berbagai status pembayaran
        $status = $payload['transaction_status'];
        $orderId = $payload['order_id'] ?? null;
        
        // Dapatkan user_id dari order_id (format: UPG-{user_id}-{timestamp})
        $userId = explode('-', $orderId)[1] ?? null;
        
        if (in_array($status, ['settlement', 'capture'])) {
            if (!$userId) {
                throw new \Exception('Invalid order ID format');
            }

            $user = User::find($userId);
            if (!$user) {
                throw new \Exception('User not found');
            }

            if ($user->package_type === 'basic') {
                $user->package_type = 'premium';
                $user->save();
                
                Log::info('User upgraded via webhook', [
                    'user_id' => $user->id,
                    'order_id' => $orderId
                ]);
            }

            return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => $status]);

    } catch (\Exception $e) {
        Log::error('Webhook error: ' . $e->getMessage());
        return response()->json([
            'error' => $e->getMessage()
        ], 400);
    }
}

    public function checkPaymentStatus($orderId)
{
    try {
        $status = \Midtrans\Transaction::status($orderId);
        $userId = explode('-', $orderId)[1];
        $user = User::find($userId);

        if ($status instanceof \stdClass) {
            $userId = explode('-', $orderId)[1];
            $user = User::find($userId);

            if ($status->transaction_status === 'settlement' && $user->package_type === 'basic') {
                $user->package_type = 'premium';
                $user->save();
            }

            return response()->json([
                'status' => $status->transaction_status,
                'package_type' => $user->package_type
            ]);
        }
        else {
            return response()->json(['error' => 'Invalid status response'], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}