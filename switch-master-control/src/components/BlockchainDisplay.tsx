import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, switchStatePDA, SwitchStateData } from "../anchor/setup";

export default function BlockchainDisplay() {
  const { connection } = useConnection();
  const [switchStateData, setSwitchStateData] = useState<SwitchStateData | null>(null);

  useEffect(() => {
    // Fetch initial account data from the PDA
    program.account.switchState.fetch(switchStatePDA).then((data) => {
      setSwitchStateData(data);
    });

    // Subscribe to account change events
    const subscriptionId = connection.onAccountChange(
      switchStatePDA,
      (accountInfo) => {
        setSwitchStateData(
          program.coder.accounts.decode("SwitchState", accountInfo.data)
        );
      }
    );

    return () => {
      // Unsubscribe from account change events
      connection.removeAccountChangeListener(subscriptionId);
    };

  }, [connection]);

  // Extract the `switches` value from the account data
  const switches = switchStateData?.switches ?? 0;

  // Convert the `switches` value to binary and pad to 8 bits
  const switchesBinary = switches.toString(2).padStart(8, "0");

  return (
    <div className="blockchain-display">
      <h2 className="text-lg">Blockchain</h2>
      <p>Switches (binary): {switchesBinary}</p>
      <p>Switches (u8): {switches}</p>
    </div>
  );
}