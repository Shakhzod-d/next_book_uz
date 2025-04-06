// import get from "lodash.get";
// import React, { Fragment } from "react";
// import { Routes as Switch, Route } from "react-router-dom";
// // import { AUTH_ROLE_PATH_LIST, RouteList } from "routes/constants/RouteList";
// // import { isToken } from "routes/utils/isAuth/isAuth";
// const Routes = () => {
//   return (
//     <Switch>
//       {RouteList.map((route) => {
//         if (get(route, "isPrivate")) {
//           if (!isToken()) return null;
//         }

//         if (AUTH_ROLE_PATH_LIST.includes(route.path)) {
//           if (isToken()) return null;
//         }

//         return (
//           <Fragment key={route.path}>
//             <Route {...route} />
//           </Fragment>
//         );
//       })}
//     </Switch>
//   );
// };

// export default Routes;
