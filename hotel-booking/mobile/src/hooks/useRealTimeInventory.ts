import { useEffect, useState } from 'react';

/**
 * Hook to listen for real-time inventory updates via WebSocket.
 */
export const useRealTimeInventory = (tenantId: string) => {
  const [lastUpdate, setLastUpdate] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://api.hotel.bt/v1/ws/${tenantId}?token=guest_token`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'INVENTORY_UPDATE') {
        setLastUpdate(data.payload);
      }
    };

    return () => ws.close();
  }, [tenantId]);

  return lastUpdate;
};
