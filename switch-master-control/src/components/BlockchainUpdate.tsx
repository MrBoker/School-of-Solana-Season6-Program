import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program, switchStatePDA } from "../anchor/setup";

interface BlockchainUpdateProps {
  switchesByte: number; // Add property switchesByte
}

export default function BlockchainUpdate({ switchesByte }: BlockchainUpdateProps) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      
      // Take the coded value of the switches selected by the user
      const newState = switchesByte;

      // Create a transaction to invoke the update function with the new state
      const transaction = await program.methods
        .update(newState)
        .accounts({
          switchState: switchStatePDA,
        })
        .transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      console.log(`Transaction successful: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);

      // Prepare a countdown to let the transaction finish and get the new value from the blockchain, then force a page reload
      const messageContainer = document.createElement("div");
      messageContainer.className = "countdown-message";
      document.body.appendChild(messageContainer);
      // 5 seconds
      let countdown = 5;
      messageContainer.innerHTML = `Page refresh in ${countdown} seconds...`;
      // Update the message every second
      const intervalId = setInterval(() => {
        countdown -= 1;
        messageContainer.innerHTML = `Page refresh in ${countdown} seconds...`;
        // When the countdown reaches 0, force page reload and delete the message
        if (countdown === 0) {
          clearInterval(intervalId);  // Stop the countdown
          window.location.reload();   // Reload page
        }
      }, 1000); // Update every second

    } catch (error) {
      console.error("Error updating blockchain:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-24"
        onClick={onClick}
        disabled={!publicKey || isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </>
  );
}