def get_bhutan_bank_templates():
    return [
        {
            "bank": "Bank of Bhutan (BoB)",
            "url_template": "https://m-pay.bob.bt/gateway/pay",
            "body_template": "{\"amount\": \"{{amount}}\", \"order_id\": \"{{booking_id}}\", \"return_url\": \"{{callback_url}}\"}",
            "signature_method": "HMAC-SHA256"
        },
        {
            "bank": "Bhutan National Bank (BNB)",
            "url_template": "https://n-pay.bnb.bt/api/v1/checkout",
            "body_template": "bookingId={{booking_id}}&amt={{amount}}&checksum={{signature}}",
            "signature_method": "SHA256"
        }
    ]
