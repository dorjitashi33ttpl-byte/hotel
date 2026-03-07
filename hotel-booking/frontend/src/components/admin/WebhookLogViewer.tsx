import React from 'react';

export const WebhookLogViewer: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow-2xl rounded-[40px] border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-8">Webhook Delivery Logs</h2>
      <div className="space-y-4">
        {[
          { partner: 'Expedia BT', event: 'booking.confirmed', status: 200, time: '2 mins ago' },
          { partner: 'Priceline', event: 'booking.cancelled', status: 500, time: '10 mins ago' }
        ].map((log, i) => (
          <div key={i} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
             <div>
                <p className="font-bold text-gray-900">{log.event}</p>
                <p className="text-xs text-gray-400">Partner: {log.partner}</p>
             </div>
             <div className="text-right">
                <span className={`px-3 py-1 rounded-lg text-xs font-black ${log.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   HTTP {log.status}
                </span>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{log.time}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
