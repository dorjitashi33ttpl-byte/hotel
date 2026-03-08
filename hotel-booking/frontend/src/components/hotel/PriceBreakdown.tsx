import React from 'react';

const PriceBreakdown = ({ base, seasonalAdjustment, yieldAdjustment, taxes, total }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold mb-3">Price Breakdown</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base Room Rate</span>
          <span>${base.toFixed(2)}</span>
        </div>
        {seasonalAdjustment !== 0 && (
          <div className="flex justify-between text-blue-600">
            <span>Seasonal Adjustment</span>
            <span>{seasonalAdjustment > 0 ? '+' : ''}${seasonalAdjustment.toFixed(2)}</span>
          </div>
        )}
        {yieldAdjustment !== 0 && (
          <div className="flex justify-between text-orange-600">
            <span>Dynamic Pricing Adjustment</span>
            <span>{yieldAdjustment > 0 ? '+' : ''}${yieldAdjustment.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-500 italic">
          <span>Taxes & Fees</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
