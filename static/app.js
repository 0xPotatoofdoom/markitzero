let currentAccount = null;
const CONTRACT_ADDR = ''


function utf8ToHex(str) {
      return Array.from(str).map(c =>
        c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
        encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
      ).join('');
}


function detectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        return true
    } else {
        return false
    }
}

function set_wallet_address(wallet_address) {
    $.get("set_wallet/"+wallet_address, function(data, status){

  });
}

function addGame(wallet_address,tx) {
    $.post("add_game/",
        { wallet_address: wallet_address, tx: tx },
         function(data, status){
                if(data == 'OK') {
                    alert('Order placed successfully')
                } else {
                    alert('Order could not place successfully')
                }
    });
}

function handleAccountsChanged(accounts) {
    console.log('Calling HandleChanged')

    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        $('#enableMetamask').html('Connected')
        $('#wallet_address').val(currentAccount)
        set_wallet_address(currentAccount)
        $('#status').html('')
        if(currentAccount != null) {
            // Set the button label
            $('#enableMetamask').html('Connected')
        }
    }
    console.log('WalletAddress in HandleAccountChanged ='+currentAccount)
}

function connect() {
    console.log('Calling connect()')
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
    if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
        $('#status').html('You refused to connect Metamask')
    } else {
        console.error(err);
    }
    });
}

$( document ).ready(function() {

    m = detectMetaMask()
    if(m) {
        $('#enableMetamask').removeClass('meta-gray')
        $('#enableMetamask').addClass('meta-normalcurrentAccount')
        $('#enableMetamask').attr('disabled',false)
        connect()

    } else {
        $('#enableMetamask').attr('disabled',true)
        $('#enableMetamask').removeClass('meta-normal')
        $('#enableMetamask').addClass('meta-gray')
    }

    $('#enableMetamask').click(function() {
        connect()
    });

    $('.btn-mint').click(function() {
        let name = $(this).data("name")
        console.log(name,price)
        eth_wei = ethUnit.toWei(price, 'ether');
        console.log('RESULT ='+eth_wei)
        console.log('Wallet ='+currentAccount)
        console.log('RESULT IN HEX ='+eth_wei.toString(16))
        
        const transactionParameters = {
              nonce: '0x00', // ignored by MetaMask
              gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
              gas: '0x22710', // customizable by user during MetaMask confirmation.
              to: CONTRACT_ADDR, // Required except during contract publications.
              from: currentAccount, // must match user's active address.
              value: eth_wei.toString(16),
              data:utf8ToHex(invoice_id),
              chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
            console.log(transactionParameters)

            if(currentAccount != null) {
                const txHash = ethereum.request({
                 method: 'eth_sendTransaction',
                 params: [transactionParameters],
                })
                .then(function(tx){
                    console.log('Transaction Hash ='+tx)
                    console.log('Wallet Inside ='+currentAccount)
                    addOrder(currentAccount,tx)
                })
                .catch((error) => {
                    console.log('Error during the transaction')
                    console.log(error)
                });
            }

    });
})