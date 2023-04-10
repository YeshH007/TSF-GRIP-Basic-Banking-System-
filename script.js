import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBFABp4LyV0_tSKJprRZXbQYuQ-4u9z1qU",
  authDomain: "user-auth-ba288.firebaseapp.com",
  databaseURL: "https://user-auth-ba288-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "user-auth-ba288",
  storageBucket: "user-auth-ba288.appspot.com",
  messagingSenderId: "568568633341",
  appId: "1:568568633341:web:0f5745f14821ac7d682b94"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase()

let open = document.querySelector("#sendmoney")
let detailsbox = document.querySelector(".details")
let close = document.querySelector("#close")
let recepemail = document.querySelector("#recepname")
let amount = document.querySelector("#amount")
let table = document.querySelector("tbody")
let tablerow = document.getElementsByName("tr")
let data;
let customerid = document.getElementsByClassName("customerid")
let customername = document.getElementsByClassName("customername")
let customeremail = document.getElementsByClassName("customeremail")
let customerbalance = document.getElementsByClassName("customerbalance")
let username = document.getElementById("name")
let userbalance = document.getElementById("balance")
let getit = () => {
  return new Promise((res, rej) => {
    onValue(ref(database, 'Customers'), (snapshot) => {
      let data = snapshot.val();
      res(data)
    })
  })
}
getit().then((resp) => {
  return new Promise((res, rej) => {
    onValue(ref(database, 'UserAccount'), (snapshot) => {
      let data = snapshot.val();
      res(data)
    })
  }).then((user) => {
    username.innerHTML = `Name:${user.name}`
    userbalance.innerHTML = `Balance:${user.balance}`
    for (let i = 0; i < resp.length + 1; i++) {
      customerid[i].innerHTML = resp[i].id
      customername[i].innerHTML = resp[i].name
      customeremail[i].innerHTML = resp[i].email
      customerbalance[i].innerHTML = resp[i].balance
    }
  })
})
  .catch((error) => { })
if (open) {
  open.addEventListener("click", () => {
    detailsbox.style.display = 'flex'
  })
  close.addEventListener("click", () => {
    detailsbox.style.display = 'none'
  })
}

let send = document.getElementById("send")
if (send) {
  send.addEventListener("click", () => {
    let setit = () => {
      return new Promise((res, rej) => {
        onValue(ref(database, 'Customers'), (snapshot) => {
          let data = snapshot.val();
          res(data)
        })
      })
    }
    setit().then((resp) => {
      return new Promise((res, rej) => {
        onValue(ref(database, 'UserAccount'), (snapshot) => {
          let data = snapshot.val();
          res(data)
        })
      }).then((user) => {
        if (user.balance > amount.value) {
          let emails = []
          for (let i = 0; i < customerid.length; i++) {
            emails.push(customeremail[i].innerHTML)
          }
          if (emails.includes(recepemail.value) == false) {
            alert("Invalid Email Address!")
          }
          else {
            for (let i = 0; i < resp.length; i++) {
              for (let j = 0; j < customeremail.length; j++) {
                if (resp[j].email == recepemail.value) {
                  update(ref(database, `Customers/${j}`), { balance: Number(Number(resp[j].balance) + Number(amount.value)) })
                  update(ref(database, `UserAccount`), { balance: Number(Number(user.balance) - Number(amount.value)) })
                }
              }
            }
            alert(`Rs. ${amount.value} successfully Transfered to ${recepemail.value}`)
            new Promise((res, rej) => {
              onValue(ref(database, 'transferlog'), (snapshot) => {
                let data = snapshot.val();
                res(data)
              })
            }).then((resp2) => {
              update(ref(database, 'transferlog'), {
                transferlog: String(`<div class='transferdetails'>Rs. ${amount.value} successfully Transfered to ${recepemail.value}</div>` + resp2.transferlog)
              })
            })
          }
        }
        else {
          alert("insufficient balance")
        }
      }).then((resp1) => {
        return new Promise((res, rej) => {
          onValue(ref(database, 'Customers'), (snapshot) => {
            let data = snapshot.val();
            res(data)
          })
        }).then((resp) => {
          return new Promise((res, rej) => {
            onValue(ref(database, 'UserAccount'), (snapshot) => {
              let data = snapshot.val();
              res(data)
            })
          }).then((user) => {
            username.innerHTML = `Name:${user.name}`
            userbalance.innerHTML = `Balance:${user.balance}`
            for (let i = 0; i < resp.length + 1; i++) {
              customerid[i].innerHTML = resp[i].id
              customername[i].innerHTML = resp[i].name
              customeremail[i].innerHTML = resp[i].email
              customerbalance[i].innerHTML = resp[i].balance
            }
          }).catch((error) => { })
        })
      })
    })
  }
  )
}
