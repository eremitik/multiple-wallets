import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const metaMask = new InjectedConnector({
  supportedChainIds: [1, 3],
})

const walletConnect = new WalletConnectConnector({
  supportedChainIds: [1, 3],
  qrcode: true
})

const coinbase = new WalletLinkConnector({
  supportedChainIds: [1, 3],
})



function App() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  { active ? console.log(library) : console.log('wallet not connected yet') }

  async function connectMM() {
    try {
      await activate(metaMask)
    } catch (err) {
      console.log(err)
    }
  }


  async function connectWC() {
    try {
      await activate(walletConnect)
    } catch (err) {
      console.log(err)
    }
  }

  async function connectCB() {
    try {
      await activate(coinbase)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDisconnect() {
    deactivate()
  }

  return (
    <AppContainer>
      <h2>Multiple Wallet connection playground</h2>
      {active ? <h3>Connected account: {account}</h3> : <h3>Please use a method below to connect.</h3>}
      <button onClick={connectMM}>MetaMask</button>
      <button onClick={connectWC}>Wallet Connect</button>
      <button onClick={connectCB}>Coinbase</button>
      <br />
      {active ? <button onClick={handleDisconnect}>Disconnect</button> : ''}
    </AppContainer>
  );
}

export default App;
