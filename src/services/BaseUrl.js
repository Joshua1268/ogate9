export const BASE_URL = (url) => {
  //let URL = `http://5.196.4.7:8080/myrahomeserviceapi/${url}`;
 // let URL = `http://localhost:8081/myra-homeservice-api/${url}`;
  let URL = `http://185.98.139.246:9090/ogatemanagement-api/adminauth/${url}`;
  // let URL = `http://10.20.0.12:8080/monportail-internet-api/${url}`; // (url pour api en ligne)
  // let URL = `https://testmomoagent.mtn.ci/monportail-internet-api/${url}`; // (url pour api en ligne fake but real)
  // let URL = `http://myinternet.mtn.ci/monportail-internet-api/${url}`;
  return URL;
};

// usename = myrahome@gmail.com
// Password = myr@h@me
