let today = new Date();
let currentMonth = today.getMonth();
let days=today.getDate();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}


function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}


function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";
   
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                let n = date.toString();
                cell.setAttribute('id',n+(month+1).toString()+year.toString());
                cell.setAttribute('onClick',"reply_click(this.id)");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let n = date.toString();
                cell.setAttribute('id',n+(month+1).toString()+year.toString());
                cell.setAttribute('onClick',"reply_click(this.id)");

                let to_pass=n+(month+1).toString()+year.toString()+"1";
                new_id=(to_pass+"1").toString();
                //number of to dos
                lis=JSON.parse(localStorage.getItem(to_pass));
                let subscript = document.createElement("sub");
                subscript.setAttribute("id","subs");
                let cellText;
                if(lis!==null)
                {
                    let count=0;  
                    lis.forEach(myFunction);
                    function myFunction(value) {
                    count=count+1;
                    }
                    
                    subscript.innerHTML="   "+count.toString();
                    cellText = document.createTextNode(date);
                }
                else
                {
                    cellText = document.createTextNode(date);
                }
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } 
                cell.appendChild(cellText);
                cell.appendChild(subscript);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); 
    }

}
//show and hide
function helper()
{
    let x = document.getElementById("whole_calender");
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    let y= document.getElementById("to-do");
    if (y.style.display !== "none") {
        y.style.display = "none";
    } 
    showCalendar(currentMonth, currentYear);

}

function reply_click(clicked_id)
{

    //show and hide
    let x = document.getElementById("whole_calender");
    if (x.style.display !== "none") {
        x.style.display = "none";
    } 
    let y= document.getElementById("to-do");
    if (y.style.display === "none") {
        y.style.display = "block";
    } 
    //form start
    let form = document.getElementById("Form");
    form.innerHTML = "";
    let cell = document.createElement("form");
    cell.setAttribute('id',clicked_id.toString()+(1).toString());
    //label 1
    let im=document.createElement("img");
    im.setAttribute('src',"close.png");
    im.setAttribute('id',"close");
    im.setAttribute('alt',"close button");
    im.setAttribute('onclick',"helper()");
    form.appendChild(im);
    let l1=document.createElement("label");
    l1.setAttribute('for',"fname");
    l1.setAttribute('id',"heading");
    let Item= document.getElementById("monthAndYear").innerHTML;
    let count=0;
    let str=Item.slice(0,3);
    for(let i=0;i<months.length;i++)
    {
        if(months[i]==str)
        {
            break;
        }
        count++;
    }
    let d=clicked_id.toString();
    if(count+1>9)
    {
        if(count+1==10)
        {
            if(d[2]=="1")
            {
                days=d[0]+d[1];
            }
            else
            {
                days=d[0];
            }

        }
        else if(count+1==11)
        {
            if(d[2]=="1" && d[3]=="1")
            {
                days=d[0]+d[1];
            }
            else
            {
                days=d[0];
            }

        }
        else if(count+1==12)
        {
            if(d[2]=="1" && d[3]=="2")
            {
                days=d[0]+d[1];
            }
            else
            {
                days=d[0];
            }

        }
    }
    else
    {
        if(d[2]==(count+1).toString())
        {
            days=d[0]+d[1];
        }
        else
        {
            days=d[0];
        }

    }
    
    let full="ENTER TO DO LIST of "+days.toString()+" "+Item;
    let cellText = document.createTextNode(full);
    l1.appendChild(cellText);
    cell.appendChild(l1);
   
    l1=document.createElement("br");
    cell.appendChild(l1);
    let c=clicked_id.toString()+(1).toString();
    //input1
    l1=document.createElement("input");
    l1.setAttribute('type',"text");
    l1.setAttribute('id',"fname");
    cell.appendChild(l1);

    //submit BUTTON
    str='save1('+c+')'
    l1=document.createElement("Button");
    l1.setAttribute('type',"submit");
    l1.setAttribute('value',"submit");
    l1.setAttribute('id',"button3");
    l1.setAttribute('onclick',str);
    cellText = document.createTextNode("SAVE");
    l1.appendChild(cellText);
    cell.appendChild(l1);

    form.appendChild(cell)
    let tbl = document.getElementById("display"); 
    tbl.innerHTML = "";
    if(localStorage.getItem(clicked_id+"1")!=null)
    {
        lis=JSON.parse(localStorage.getItem(clicked_id+"1"));
        console.log(lis);
        lis.forEach(myFunction);
        
        function myFunction(value) {
            let row = document.createElement("tr");
            row.setAttribute("id","display_row");
            let cell = document.createElement("td");
            let cellText = document.createTextNode(value);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tbl.appendChild(row); 
        }

    }
    
}

function save1(form_id)
{
    let a=[];
    if(localStorage.getItem(form_id)!=null)
    {
        lis=JSON.parse(localStorage.getItem(form_id));
        console.log(lis);
        
        lis.forEach(myFunction);

        function myFunction(value) {
          a.push(value);
        }

    }
    let Item= document.getElementById("fname").value;
    a.push(Item);
    localStorage.setItem(form_id,JSON.stringify(a));
    console.log(Item);
    let x=form_id;
    reply_click((x/10)|0);
   
}