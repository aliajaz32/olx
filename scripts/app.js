


console.log('running the app');
if (document.getElementById('inputfile') != null) {
    // console.log('not found')
    document.getElementById('inputfile').addEventListener('change', (e) => {
        file1 = e.target.files[0];
        console.log(file1.name)
        var newMetadata = {
            name: file1.name,
            customMetadata: {
                "name": 'document.getElementById("name1").value',
                "ownerEmail": 'localStorage.getItem()'

            }
        }

        console.log("new meta data: ", newMetadata);

        const uploadTask = storageRef
            .child(`ads/category/${file1.name}`)
            .put(file1, newMetadata); //create a child directory called images, and place the file inside this directory

        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            console.log("snapshot: ", snapshot)

            if (snapshot.state != "running") {
                console.log("failed: ", snapshot.state)
                document.getElementById("status").innerHTML = `<span style='color: red;'><b> Uploading ${percent}<b></span>`
            } else {
                var percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                document.getElementById("status").innerHTML = `<span style='color: white;'><b> Uploading ${percent}%<b></span>`
            }

        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);


        }, () => {
            // Do something once upload is complete
            console.log('success');
            document.getElementById("status").innerHTML = "<span style='color: white;'><b> COMPLETED <b></span>";
            // let ali =file1.name.slice(0,file1.name.lastIndexOf('.'))
            let rt = firebase.storage().ref().child(`ads/category/${file1.name}`);
            rt.getDownloadURL().then((data) => {
                console.log('imageURl', data);
                var picSourceUrl = data;
                localStorage.setItem('picUrl', picSourceUrl)
            })

        });
    })
}

// localStorage.setItem('e',e.target.files[0]);


var storage = firebase.storage();
var storageRef = storage.ref();
function signIn() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {

        localStorage.setItem('user', 'qwerty');
        localStorage.setItem('useremail', email)
        swal({
            title: "logged in!",
            text: "You are successfully logged in!",
            icon: "success",
            button: "ok!",
        });

        setTimeout(() => {

            window.location = './index.html';
        }, 2000)
    }
    )
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            swal({
                title: "error!",
                text: errorMessage,
                icon: "error",
                button: "ok!",
            });
        });
}
function signUpEmail() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
        let obj = {
            email: email,
            pass: password
        }
        //         let obj = {
        //             email:email,
        //             pass:password
        //         }
        //         let uid = firebase.database().currentUser.uid
        console.log(success)
        let useruid = firebase.auth().currentUser.uid;
        console.log(useruid);
        firebase.database().ref("users/" + useruid).set(obj).then((result) => {
            console.log(result);
            swal({
                title: "account created !",
                text: "Your account is successfully created!",
                icon: "success",
                button: "ok!",
            });
            setTimeout(() => {
                window.location = './login.html'

            }, 2000)
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                alert(errorMessage);
                swal({
                    title: "error!",
                    text: errorMessage,
                    icon: "error",
                    button: "ok!",
                });
            })

    })



}
if (document.getElementById('loginBtn') != null) {

    window.onload = chklogin
    function chklogin() {

        if (localStorage.getItem('user') === 'qwerty') {
            document.getElementById('loginBtn').innerHTML = '<span class="glyphicon glyphicon-log-in"></span>  logout'
            // console.log('now')
            firebase.database().ref(`posts`).on("child_added", (userObjData) => {
                userOwnData = userObjData.val();
                console.log(userOwnData);
                if (userOwnData.category === "mobile") {

                    document.getElementById("mobile").innerHTML +=
                        `
                            <div class="col-sm-4">
                            <div style="width:280px; height:250px; margin: 20px; border:1.5px solid latergray;" class="card text-center">
                                    <div class="placeBox" style="margin-top:10px">
                                      <img style="height:150px" width="200px;" src="${userOwnData.picSourceUrl}" class="img-fluid">
                                    </div>
                                    <div class="container text-left">
                                      <h6 style="font-weight:800;" class="text-middle" > RS ${userOwnData.category}</h6>
                                      <p style="font-size:12px"> ${userOwnData.name}</p>
                                    </div>
                                    <div class="container text-bottom">
                                      <span style="font-size:10px; float: left;" class="span-left"> ${userOwnData.condition}</span> 
                                    </div>
                                    <a href='./chat.html'>chat with buyer</a>
                                  </div>
                                </div>`
                }

                if (userOwnData.category === 'accessories') {
                    document.getElementById("accessories").innerHTML +=

                        `
                            <div class="col-sm-4">
                            <div style="width:280px; height:250px; margin: 20px; border:1.5px solid latergray;" class="card text-center">
                                    <div class="placeBox" style="margin-top:10px">
                                      <img style="height:150px" width="200px;" src="${userOwnData.picSourceUrl}" class="img-fluid">
                                    </div>
                                    <div class="container text-left">
                                      <h6 style="font-weight:800;" class="text-middle" > RS ${userOwnData.category}</h6>
                                      <p style="font-size:12px"> ${userOwnData.name}</p>
                                    </div>
                                    <div class="container text-bottom">
                                      <span style="font-size:10px; float: left;" class="span-left"> ${userOwnData.condition}</span> 
                                    </div>
                                    <a href='./chat.html'>chat with buyer</a>
                                  </div>
                                </div>`
                }



                if (userOwnData.category === 'car') {
                    document.getElementById("cars").innerHTML +=

                        `
                            <div class="col-sm-4">
                            <div style="width:280px; height:250px; margin: 20px; border:1.5px solid latergray;" class="card text-center">
                                    <div class="placeBox" style="margin-top:10px">
                                      <img style="height:150px" width="200px;" src="${userOwnData.picSourceUrl}" class="img-fluid">
                                    </div>
                                    <div class="container text-left">
                                      <h6 style="font-weight:800;" class="text-middle" > RS ${userOwnData.category}</h6>
                                      <p style="font-size:12px"> ${userOwnData.name}</p>
                                    </div>
                                    <div class="container text-bottom">
                                      <span style="font-size:10px; float: left;" class="span-left"> ${userOwnData.condition}</span> 
                                    </div>
                                    <a href='./chat.html'>chat with buyer</a>
                                  </div>
                                </div>`
                }


            })

        }


        //    let rt = firebase.storage().ref().child(`ads/1`)
        //    .on('child_added',snapshot=>{
        //        console.log('data',                     
        //        snapshot
        //        );

    }
    //  rt.getDownloadURL().then((data)=>{
    //     console.log("data=>",data)
    //     document.getElementById('now12').src = data
    // })






}


function logout() {
    if (localStorage.getItem('user') === 'qwerty') {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            swal({
                title: "logged out!",
                text: "You are successfully logged out!",
                icon: "success",
                button: "ok!",
            });
            console.log('sign out');
            document.getElementById('loginBtn').innerHTML = '<span class="glyphicon glyphicon-log-in"></span>  login'
            localStorage.clear();
        })
    }
    else {
        window.location = './login.html'
    }
};


if (document.getElementById('category1') != null) {

    var selection = document.getElementById('category1')
    selection.addEventListener('change', (e) => {
        sel = selection.selectedIndex
        console.log(sel);
    })
    var condition = document.getElementById('condition')
    condition.addEventListener('change', (e) => {
        condition = selection.selectedIndex
        console.log(condition);
    })
    let brand = document.getElementById('brand')
    brand.addEventListener('change', (e) => {
        brand1 = brand.selectedIndex
        console.log(brand1);
    })
}

function upload() {
    var category;
    var condition;
    var brand;
    if (document.getElementById('category1').selectedIndex === 0) {
        category = 'car'
    }
    if (document.getElementById('category1').selectedIndex === 1) {
        category = 'mobile'
    }
    if (document.getElementById('category1').selectedIndex === 2) {
        category = 'accessories'
    }
    if (document.getElementById('condition').selectedIndex === 0) {
        condition = 'new'
    }
    if (document.getElementById('condition').selectedIndex === 1) {
        condition = 'used'
    }
    if (document.getElementById('brand').selectedIndex === 0) {
        brand = 'nokia'
    }
    if (document.getElementById('brand').selectedIndex === 1) {
        brand = 'qmobile'
    }
    if (document.getElementById('brand').selectedIndex === 2) {
        brand = 'samsung'
    }
    if (document.getElementById('brand').selectedIndex === 2) {
        brand = 'motorolla'
    }

    let data23 = {
        category: category,
        condition: condition,
        brand: brand,
        name: document.getElementById('name1').value,
        description: document.getElementById('name2').value,
        picSourceUrl: localStorage.getItem('picUrl')
    }
    console.log(data23) 


    let useruid = firebase.auth().currentUser.uid;
    firebase.database().ref("posts/ "+ useruid).set(data23)
        .then((data) => {
            console.log('posted', data)
        })

    // var file = document.getElementById('inputfile').value
    // e.preventDefault();
    // localStorage.getItem('e')
    // var file =    localStorage.getItem('e')
    // var file = 

};

// firebase.storage().ref('ads/')


function search() {
    firebase.database().ref(`posts`).on("child_added", (userObjData) => {
        userOwnData = userObjData.val();
        var search12 = document.getElementById('searchValue').value;
        console.log(search12);
        console.log('usr own data',userOwnData);
        
        if(userOwnData.category=='mobile'){
            cellPhones1=userOwnData
        }
        else if(userOwnData.category=='accessories'){
            accessories1=userOwnData
        }
        else if(userOwnData.category=='car'){
            cars1=userOwnData
        }
        
    });
            databhai = {
                   
                cars: cars1,
                mobile: cellPhones1,
                accessories:accessories1
            }
            console.log('data values', databhai)
    console.log('cellphones in the area', databhai)
// console.log(cars[databhai]);
for (var key in databhai){
    if(document.getElementById('searchValue').value===key){
document.getElementById( 'cars').innerHTML='';
document.getElementById( 'accessories').innerHTML='';
document.getElementById( 'mobile').innerHTML='';

        console.log('match found',key);
        document.getElementById(key).innerHTML=
        `<div class="col-sm-4">
        <div style="width:280px; height:250px; margin: 20px; border:1.5px solid latergray;" class="card text-center">
                <div class="placeBox" style="margin-top:10px">
                  <img style="height:150px" width="200px;" src="${databhai[key].picSourceUrl}" class="img-fluid">
                </div>
                <div class="container text-left">
                  <h6 style="font-weight:800;" class="text-middle" > RS ${databhai[key].category}</h6>
                  <p style="font-size:12px"> ${databhai[key].name}</p>
                </div>
                <div class="container text-bottom">
                  <span style="font-size:10px; float: left;" class="span-left"> ${databhai[key].condition}</span> 
                </div>
                <a href='./chat.html'>chat with buyer</a>
              </div>
            </div>`
    }

}

    // console.log(cellPhones[it][bhai]);
    //  for (var key in cellPhones){

    //     for(var key1 in cellPhones[key]){
    //            console.log(cellPhones[key][key1]);

    //       }
    //  }
    // var flag = false;
    //  function searchData(){
    //     var data = document.getElementById('inputfield').value;
    //     if(data!=undefined && data!= "" && data!= " "){
    //         for (var key in cellPhones){
    //             for(var key1 in cellPhones[key]){
    //                 for(var key2 in cellPhones[key][key1]){
    //                     if(data===key1){
    //                        document.getElementById('data').innerHTML ="";
    //                        document.getElementById('data').innerHTML =
    //                           "<tr>"+"<td>"+"model name: "+   key1   + "</td>" + "</tr>" +
    //                           "<tr>"+"<td>"+"sim :"+cellPhones[key][key1].sim   +"</td>"+"</tr>"+
    //                           "<tr>"+"<td>"+"processor :"+cellPhones[key][key1].processor   +"</td>"+"</tr>"+
    //                           "<tr>"+"<td>"+"camera :"+cellPhones[key][key1].camera   +"</td>"+"</tr>"+
    //                           "<tr>"+"<td>"+"display :"+cellPhones[key][key1].display   +"</td>"+"</tr>"

    //                     }
    //                 }            
    //             }
    //         }
    //     }    


    //     else{
    //         console.log("data not found");
    //     }
    // }
}











