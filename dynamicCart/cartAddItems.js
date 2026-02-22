document.getElementById("submit").addEventListener("click",displayData);

function displayData()
{
    var i=0;  //iterator for table rows

    const expense=document.getElementById("expName").value;
    let amount=document.getElementById("amt").value;
    updateTotalAmount(amount);
    
    const table=document.getElementById("putData");
    // console.log(table);
    const tbody=document.getElementsByTagName('tbody');
    // console.log(tbody);
    
    const newtr=tbody[i].appendChild(document.createElement("tr"));
    i++;
    
    const td1=newtr.appendChild(document.createElement("td"));
    td1.innerText=`${expense}`;
    
    const td2=newtr.appendChild(document.createElement("td"));
    td2.innerText=`$${amount}`;
    
    const td3=newtr.appendChild(document.createElement("td"));
    let delbttn=document.createElement('button');
    delbttn.id='delBtn';
    delbttn.innerHTML='delete';
    delbttn.addEventListener("click",(event)=>
    {
        event.target.parentElement.parentElement.remove();
    })
    td3.append(delbttn);
    
}

let totalAmount = 0;
function updateTotalAmount(amt)
{
    totalAmount = totalAmount + amt;
    document.getElementById("totalAmt").innerText=`$${totalAmount}`;
}

