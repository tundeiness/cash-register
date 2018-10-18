function checkCashRegister(price, cash, cid) {

//create a currency unit object array holding the value of denominations in the cash register
    const currencyUnit = [
        { 'name': 'ONE HUNDRED', 'value': 100 },
        { 'name': 'TWENTY', 'value': 20 },
        { 'name': 'TEN', 'value': 10 },
        { 'name': 'FIVE', 'value': 5 },
        { 'name': 'ONE', 'value': 1 },
        { 'name': 'QUARTER', 'value': 0.25 },
        { 'name': 'DIME', 'value': 0.1 },
        { 'name': 'NICKEL', 'value': 0.05 },
        { 'name': 'PENNY', 'value': 0.01 }
    ];

//declare an empty array to hold copy of the cash in drawer
// and create a copy of the drawer
    let copyDrawer = [];
    for (let arr of cid) {
        copyDrawer.push(arr);
    }

// calculate the change to collect per transaction
    let expectedChange = cash - price;

// calculate the total monies in the cash register for the current transaction
    let totalInRegister = function() {
        return copyDrawer.map((arr) => {
            return arr[1];
        }).reduce((acc, curr) => {
            return acc + curr;
        }, 0).toFixed(2);
    };

//sort the monies in the drawer

    let sortedDrawer = copyDrawer.reverse(); 

// initialise some tools which will be useful in future calculations.
    let misc;
    let drawer = [];
    let finale = {};

// get the number of denominations in the cash drawer by dividing their values and the amount in the 
// current cash drawer to get an array called frequency
    let frequency = sortedDrawer.map((inx, i) => { return Math.round(inx[1] / currencyUnit[i].value); });

// filter out any currency greater than 0 in the sorted cash drawer
// this is to make future computations easier
    let activeDenoms = sortedDrawer.filter((val) => {
        return val[1] > 0;
    });



    if ((activeDenoms.length === 2 && totalInRegister() > expectedChange) || (activeDenoms.length === 1 && totalInRegister() < expectedChange)) {

        console.log({
            status: "INSUFFICIENT_FUNDS",
            change: []
        });

        console.log({
            status: "INSUFFICIENT_FUNDS",
            change: []
        });


    } else if (totalInRegister() == expectedChange) {

       // console.log({ 'status': 'CLOSED', 'change': cid });

        return { 'status': 'CLOSED', 'change': cid };

    } else {

        //do some long stuffs
        for (let idx = 0; idx < currencyUnit.length; idx++) {

            let iterator = frequency[idx];
            let cashi = 0;

            while (expectedChange >= currencyUnit[idx].value && iterator > 0) {

                misc = Number((expectedChange - currencyUnit[idx].value).toFixed(2));

                expectedChange = misc;
                iterator--;
                cashi += currencyUnit[idx].value;

            }
            drawer.push([currencyUnit[idx].name, Math.round(cashi * 100) / 100]);
        }


        let usedBillsAndCoins = drawer.filter((val) => {
            return val[1] > 0;
        });

        finale.status = 'OPEN';
        finale.change = usedBillsAndCoins;
        console.log(finale);
        return finale;
    }

}


/* checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]); */

/* checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]); */


checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);

/* checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);  */

/* checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]); */