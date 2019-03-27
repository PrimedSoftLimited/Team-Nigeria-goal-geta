$("document").ready(function () {

    $(".regForm").hide();
    $(".sign-in-text-2").hide();
    $(".callender").hide();
    $(".clock").hide();
    // $(".set-goal").hide();
    $(".loader").hide();
    $(".sign-in-btn").css("background", "rgba(0,0,0,0.6)");
    $(".commit-btn img").hide();

    //for registration and login form
    $(".sign-up-btn").click(function () {
        $(".loginForm").slideUp(500);
        $(".regForm").slideDown(500);
        $(".sign-in-text-1").slideUp(500);
        $(".sign-in-text-2").slideDown(500);
        $(".sign-up-btn").css("background", "rgba(0,0,0,0.6)");
        $(".sign-in-btn").css("background", "rgb(228, 60, 52)");
    });

    //for registration and login form
    $(".sign-in-btn").click(function () {
        $(".loginForm").slideDown(500);
        $(".regForm").slideUp(500);
        $(".sign-in-text-2").slideUp(500);
        $(".sign-in-text-1").slideDown(500);
        $(".sign-in-btn").css("background", "rgba(0,0,0,0.6)");
        $(".sign-up-btn").css("background", "rgb(228, 60, 52)");
    });

    //for home page
    $(".customize").click(function () {
        $(".set-goal").slideDown(500);
    });

    $(".fa-times").click(function () {
        $(".set-goal").slideUp(500);
    });
    $(".commit-btn").click(function () {
        $(".commit-btn img").show(100);
    });
});











function _(str) {
    return document.querySelector(str);
}


// check if there is a token
const checkToken = !!localStorage.getItem("goaltoken");

// the path we dont want just anyone to see
if (location.pathname == "/home.html") {

    // if there's no token, redirect the user to loging
    if (!checkToken) {
        location.replace('/login.html');
    }
}

if (location.pathname == "/dashboard.html") {
    if (!checkToken) {
        location.replace('/home.html');
    }
}






// For registration
const regForm = _("#regForm");
var xmlhttp;



if (regForm) {

    regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = _("#rname").value;
        const email = _("#remail").value;
        const phone = _("#rphone").value;
        //    const type = _("#rtype").value;
        const pwd = _("#rpwd").value;
        const cpwd = _("#rcpwd").value;


        const userData = {
            name: name,
            email: email,
            phone_number: phone,
            //    account_type: type,
            password: pwd,
            password_confirmation: cpwd
        }
        $(".loader").show(200);
        const registerUrl = "https://­goalnew.herokuapp.com­/api/register ";

        axios.post(registerUrl, userData).then(function (response) {

            console.log(response.data);


        }).catch(function (err) {
            console.log(err.response)
            console.log(err.response.data.message)

            if (err.response.data.hasOwnProperty("name")) {
                $name = err.response.data.name[0];
                // $password = err.response.data.password[0];
                _('#err_msg').innerHTML = `<p  style="color: red;">${$email}</p><p  style="color: red;">${$password}</p>`;
            }


        })
    })
}















// Login User
const loginForm = _("#loginForm");

if (loginForm) {

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = _("#lemail").value;
        const pwd = _("#lpwd").value;

        const userData = {
            email: email,
            password: pwd
        }


        const loginUrl = "https://­goalnew.herokuapp.com­/api/login";

        axios.post(loginUrl, userData).then(function (response) {

            console.log(response.data)

            const token = response.data.data.token

            localStorage.setItem('goaltoken', token);

            location.replace("/home.html")

        }).catch(function (err) {
            console.log(err.response)
            console.log(err.response.data.message)
            if (err.response.data.hasOwnProperty("error")) {
                $msg = err.response.data.message;
                _('#err_msg').innerHTML = `<p  style="color: red; font-size: 15px;">${$msg}</p>`;
            }
        })
    })
}














// View Users Profile
const profile = _("#profile");

if (profile) {

    const profileUrl = "https://­goalnew.herokuapp.com­/api/profile";

    const token = localStorage.getItem("goaltoken");


    console.log(token)

    const options = {
        headers: {
            Authorization: token,
        }
    }

    console.log(_('#basicInfo').innerHTML)

    // _('#bigName').innerHTML = "some issues";
    axios.get(profileUrl, options).then(function (response) {
        console.log(response.data.data.user);
        _('#bigName').innerHTML

        const user = response.data.data.user;

        localStorage.setItem('user', user)

        console.log(user.name)

        _('#bigName').innerHTML = ("Hello ", user.name);

        _("#basicInfo").innerHTML = `
        <div class="row">
            <div class="col-12" >
                <p><i class="fa fa-user-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${user.name}</p>
            </div>
        </div>
        <hr />

        <div class="row">
            <div class="col-12" >
                <p><i class="fa fa-at"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${user.email}</p>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-12" >
                <p><i class="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${user.phone_number}</p>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-3 col-md-2 col-5">
                
            </div>
            <div class="col-12">
                <p><i class="fa fa-user-plus"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${new Date(user.created_at).toLocaleDateString()}</p>
            </div>
        </div>
        <hr />
        `;

    }).catch(function (err) {
        console.log(err.response);
    })
}














//for goals setting
const home = _("#home");

if (home) {

    const token = localStorage.getItem("goaltoken");



    console.log(token)

    setGoal = _("#setGoal");

    if (setGoal) {

        setGoal.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = _("#title").value;
            const description = _("#description").value;
            const completed = 0;
            const start = _("#start").value;
            const finish = _("#finish").value;

            const options = {
                headers: {
                    Authorization: token,
                }
            }

            const userData = {
                title: title,
                description: description,
                completed: completed,
                start: start,
                finish: finish
            }

            const registerUrl = "https://goalnew.herokuapp.com/api/goals ";

            axios.post(registerUrl, userData, options).then(function (response) {

                console.log(token)
                console.log(response.data);

                // if(response.data.hasOwnProperty(""))
                location.replace("/dashboard.html")


            }).catch(function (err) {
                console.log(err.response);
                console.log(err.response.data.message)
                if (err.response.data.hasOwnProperty("error")) {
                    $msg = err.response.data.message;
                    _('#err_msg').innerHTML = `<p  style="color: red; font-size: 15px;">${$msg}</p>`;
                }
            })
        })
    }
}













//view goal
dashboard = _("#dashboard");

if (dashboard) {

    const dashboardUrl = "https://goalnew.herokuapp.com/api/goals/1 ";

    const token = localStorage.getItem("goaltoken");


    console.log(token)

    const options = {
        headers: {
            Authorization: token,
        }
    }

    // console.log(_('#basicInfo').innerHTML)

    axios.get(dashboardUrl, options).then(function (response) {
        console.log(response.data.data.user);


        const user = response.data.data.user;

        localStorage.setItem('user', user)

        console.log(user.name)

        if (user) {
            _('#user_img').innerHTML = ``;
        }

        _('#bigName').innerHTML = `Name: ${user.name}`;
        _("#show_image").innerHTML = `
         <img src="http://res.cloudinary.com/getfiledata/image/upload/v1552380958/${user.user_image}">
         `;
        _("#user_details").innerHTML = `

        <tr>
          <td>NAME</td>
            <td>${user.name}</td>
          </tr>

          <tr>
            <td>EMAIL</td>
            <td>${user.email}</td>
          </tr>
          <tr>
            <td>NUMBER</td>
            <td>${user.phone_number}</td>
          </tr>
          <tr>
            <td>ACCOUNT TYPE</td>
            <td>${user.account_type} </td>
          </tr>

          <tr>
            <td>DATE CREATED</td>
            <td>${new Date(user.created_at).toLocaleDateString()}</td>
          </tr> 
  
        `;
    }).catch(function (err) {

    })
}