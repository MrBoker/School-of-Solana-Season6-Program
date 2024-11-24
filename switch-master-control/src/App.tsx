import { Buffer } from 'buffer';

// Define Buffer globally if not available
if (!window.Buffer) {
  window.Buffer = Buffer;
}

import { useMemo } from 'react';
import { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import BlockchainDisplay from "./components/BlockchainDisplay";
import BlockchainUpdate from "./components/BlockchainUpdate";

import './App.css';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {

  // Switches states array (8)
  const [switches, setSwitches] = useState<boolean[]>(new Array(8).fill(false));

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  // Function to update the individual switches
  const handleSwitchChange = (index: number) => {
    setSwitches((prev) => {
      const newSwitches = [...prev];
      newSwitches[index] = !newSwitches[index];
      return newSwitches;
    });
  };
  
  // Conversion of the switches to binary format and u8 format
  const switchesBinary = switches.map((switchState) => (switchState ? 1 : 0)).join("");
  const switchesByte = parseInt(switchesBinary, 2);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="wallet-container">
            <WalletMultiButton />
          </div>
          <h1 className="heading">Switch Master Control</h1>
          {/* Switches */}
          <div className="switch-container"> 
            {switches.map((_, index) => (
              <div key={index} className="switch-item"> 
                <label className="switch-label">{`Device ${index + 1}`}</label> 
                <button
                  className={`switch-button ${switches[index] ? "on" : "off"}`}
                  onClick={() => handleSwitchChange(index)}
                >
                  {switches[index] ? "ON" : "OFF"}
                </button>
              </div>
            ))}
          </div>
          {/* Binary and u8 coding from the switches */}
          <div
            style={{
              position: "absolute",
              top: "210px",     
              left: "5px",   
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "20px", marginLeft: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>Switches new value:</label>
                <input
                  type="text"
                  value={switchesBinary}
                  readOnly
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>(u8 Format):</label>
                <input
                  type="text"
                  value={switchesByte}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Components to show the switches states from the blockchain */}
          <BlockchainDisplay />
          {/* Blockchain Update Button */}
          <div
            style={{
              position: "absolute",
              top: "330px",
              left: "20px",
            }}
          >
            <BlockchainUpdate switchesByte={switchesByte} />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;