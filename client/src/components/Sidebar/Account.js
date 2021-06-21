import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchStaffInfomation } from "actions";
import { removeCookie } from "units/cookieWeb";

export default function Account() {
  useDispatch(actFetchStaffInfomation());
  const account = useSelector(
    (state) => state._staffInfomation._staffInfomation
  );
  console.log(account);
  const signOut = () => {
    removeCookie(true, true);
    window.location.href = "https://zelios-sea.netlify.app/";
  };
  return (
    <li>
      <div className="profile-details">
        <div className="profile-content">
          <img
            src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/182288612_2911326315777633_865059058360099424_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zx9wHyp5QUgAX_TqUIK&_nc_ht=scontent.fhan3-1.fna&oh=d87e99468059c5360d9a4d6e98382ec6&oe=60D4CCE5"
            alt="profile"
          />
        </div>
        <div className="name-job">
          <div className="profile_name">{account.name}</div>
          <div className="job">{account.position}</div>
        </div>
        <i className="bx bx-log-out" onClick={() => signOut()}></i>
      </div>
    </li>
  );
}
