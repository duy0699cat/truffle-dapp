import React, { Component } from "react";
import certificationContract from "./contracts/Certification.json";//
import getWeb3 from "./getWeb3";//
import "./App.css";
class App extends Component {
  state = {  certificationValue0: -1,certificationValue1: "none",certificationValue2: "null", certificationValue3: "null",certificationValue4: "00000000" , web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

       let deployedNetwork2 = certificationContract.networks[networkId];
        const certificationInstance = new web3.eth.Contract(
          certificationContract.abi,
          deployedNetwork2 && deployedNetwork2.address );
        
       console.log(certificationInstance.options.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, certificationContract: certificationInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
  };

  setData = async () => {
    
    const { accounts, certificationContract} = this.state;
    var id = document.getElementById("id").value;
    var n1 = document.getElementById("name1").value;
    var n2 = document.getElementById("name2").value;
    var n3 = document.getElementById("name3").value;
    var date = document.getElementById("date").value;
    console.log("\ncheck cerf account:");
    console.log(accounts[0]);

     try{await certificationContract.methods.generateCertificate(id,n1,n2,n3,date).send({ from: accounts[0]});}
     catch(error){ alert("create contract error");
     console.log(error);
    }
    
  };

  getDat = async () => {
    const { accounts, certificationContract} = this.state;
    var id2 = document.getElementById("id2").value;
    console.log("\ncheck cerf account in get:");
    console.log(accounts[0]);
    console.log("\nand id2: "+id2);
    var result;
    try{
     result = await certificationContract.methods.getData(id2).call();
    // console.log("result is: ");
    //console.log(result);

  }
   catch(error){ alert("get contract error");
  console.log(error)}
  
   console.log(result);

    const { 0: rn1, 1: rn2, 2: rn3, 3: rdate} = result; 
    this.setState({ certificationValue1: rn1 });
    this.setState({ certificationValue2: rn2 });
    this.setState({ certificationValue3: rn3 });
    this.setState({ certificationValue4: rdate });
    
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Certification Example</h2>
      
        <div>The cert data is: {this.state.certificationValue0}, {this.state.certificationValue1}, {this.state.certificationValue2}, {this.state.certificationValue3}, {this.state.certificationValue4}</div>
        <form>
  <label>
  Cert id:
    <input type="text" id="id" name="id" />
  </label>
  <label>
  Candidate name:
    <input type="text" id="name1" name="candidate name" />
  </label>
  <div></div>
  <label>
    Organization:
    <input type="text" id="name2" name="Organization name" />
  </label>
  <label>
    Major:
    <input type="text" id="name3" name="Major name" />
  </label>
  <label>
    Date:
    <input type="number" id="date" name="Date issue" />
  </label>
</form>
        <button className="margin-right" onClick={() => {
                    this.setData()
                }}>set num</button>
  <div></div>
  <label>
    Data id:
    <input type="text" id="id2" name="idtoget" />
  </label>
        <button onClick={() => {
         this.getDat()
       
        }}>get num</button>
      </div>
    );
  }
}

export default App;