import { useEffect } from "react";
import { program, switchStatePDA } from "../anchor/setup";

interface BlockchainDisplayProps {
  onStateUpdate: (byteValue: number) => void; // Modificado para aceptar un número
}

export default function BlockchainDisplay({ onStateUpdate }: BlockchainDisplayProps) { // NUEVO
  useEffect(() => {
    // Function for reading the state from the PDA
    const fetchSwitchesState = async () => {
      try {
        const switchState = await program.account.switchState.fetch(switchStatePDA);
        const currentState = switchState.switches;

        // Verify value of currentState (it should be an integer in the range 0-255)
        console.log("Current state (u8):", currentState);

        // Notify to App the new state
        onStateUpdate(currentState);
      } catch (error) {
        console.error("Error reading from PDA:", error);
      }
    };

    // Read periodically
    const intervalId = setInterval(fetchSwitchesState, 5000); // Every 5 seconds
    fetchSwitchesState();

    return () => clearInterval(intervalId);
  }, [onStateUpdate]);

  return (
    <div className="blockchain-display">
      <h2 className="text-lg">Blockchain</h2>
      <p>Reading state periodically...</p>
    </div>
  );
}