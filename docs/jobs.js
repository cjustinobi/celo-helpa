/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/jobs.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/jobs.js":
/*!*********************!*\
  !*** ./src/jobs.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//\n// import BigNumber from 'bignumber.js'\n// import erc20Abi from '../contract/erc20.abi.json'\n// import './navigation'\n// import './transactions'\n//\n// import {\n//   ERC20_DECIMALS,\n//   MPContractAddress,\n//   cUSDContractAddress,\n//   connectCeloWallet,\n//   notification,\n//   notificationOff,\n//   kit,\n//   contract\n// } from './common'\n//\n//\n// let vendors = []\n//\n//\n//\n// async function approve(_price) {\n//   const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)\n//\n//   const result = await cUSDContract.methods\n//     .approve(MPContractAddress, _price)\n//     .send({ from: kit.defaultAccount })\n//   return result\n// }\n//\n// const getBalance = async function () {\n//   const totalBalance = await kit.getTotalBalance(kit.defaultAccount)\n//   const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)\n//   document.querySelector('#balance').textContent = cUSDBalance\n// }\n//\n// const getVendors = async function() {\n//   const _vendorLength = await contract.methods.getVendorCount().call()\n//   const _vendors = []\n//\n//   for (let i = 0; i < _vendorLength; i++) {\n//     let _vendor = new Promise(async (resolve) => {\n//       let p = await contract.methods.getVendors(i).call()\n//       p.index = i\n//\n//       resolve(p)\n//     })\n//     _vendors.push(_vendor)\n//   }\n//\n//   vendors = await Promise.all(_vendors)\n//   console.log(vendors)\n//   renderVendors()\n// }\n//\n// function renderVendors() {\n//   document.getElementById('marketplace').innerHTML = ''\n//   vendors.forEach((_vendor) => {\n//     const newDiv = document.createElement('div')\n//     newDiv.className = 'col-md-4'\n//     newDiv.innerHTML = vendorTemplate(_vendor)\n//     document.getElementById('marketplace').appendChild(newDiv)\n//   })\n// }\n//\n// function vendorTemplate(_vendor) {\n//   return `\n//     <div class=\"card mb-4\">\n//       <img class=\"card-img-top\" src=\"${_vendor.filePath}\" alt=\"...\">\n//       <div class=\"position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start\">\n//         ${_vendor.transCount} Transactions\n//       </div>\n//       <div class=\"card-body text-left p-4 position-relative\">\n//         <div class=\"translate-middle-y position-absolute top-0\">\n//         ${identiconTemplate(_vendor.vendorAddress)}\n//         </div>\n//         <h2 class=\"card-title fs-4 fw-bold mt-2\">${_vendor.businessName}</h2>\n//         <p class=\"card-text mb-4\" style=\"min-height: 82px\">\n//           ${_vendor.description}\n//         </p>\n//\n//         <div class=\"d-grid gap-2\">\n//           <a class=\"btn btn-lg btn-outline-dark hireBtn fs-6 p-3\" id=${\n//     _vendor.index\n//   }>\n//\n//             Hire for ${new BigNumber(_vendor.price).shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD\n//           </a>\n//         </div>\n//       </div>\n//     </div>\n//   `\n// }\n//\n// function identiconTemplate(_address) {\n//   const icon = blockies\n//     .create({\n//       seed: _address,\n//       size: 8,\n//       scale: 16,\n//     })\n//     .toDataURL()\n//\n//   return `\n//   <div class=\"rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0\">\n//     <a href=\"https://alfajores-blockscout.celo-testnet.org/address/${_address}/transactions\"\n//         target=\"_blank\">\n//         <img src=\"${icon}\" width=\"48\" alt=\"${_address}\">\n//     </a>\n//   </div>\n//   `\n// }\n//\n//\n//\n// window.addEventListener('load', async () => {\n//   // notification('⌛ Loading...')\n//   await connectCeloWallet()\n//   await getBalance()\n//   await getVendors()\n//   await test()\n//\n//   // notificationOff()\n// });\n//\n// document\n//   .querySelector('#createAccountBtn')\n//   .addEventListener('click', async (e) => {\n//     const params = [\n//       document.getElementById('businessName').value,\n//       document.getElementById('profession').value,\n//       document.getElementById('filePath').value,\n//       document.getElementById('description').value,\n//       new BigNumber(document.getElementById('price').value)\n//         .shiftedBy(ERC20_DECIMALS)\n//         .toString()\n//     ]\n//     notification(`⌛ Adding '${params[0]}'...`)\n//     try {\n//       await contract.methods\n//         .createVendor(...params)\n//         .send({ from: kit.defaultAccount })\n//     } catch (error) {\n//       notification(`⚠️ ${error}.`)\n//     }\n//     notification(`🎉 Account successfully created '${params[0]}'.`)\n//     getVendors()\n//   })\n//\n// document.querySelector('#marketplace').addEventListener('click', async (e) => {\n//   if (e.target.className.includes('hireBtn')) {\n//     const index = e.target.id\n//     // notification('⌛ Waiting for payment approval...')\n//     // try {\n//     //   await approve(products[index].price)\n//     // } catch (error) {\n//     //   notification(`⚠️ ${error}.`)\n//     // }\n//     // return console.log(index)\n//     notification(`⌛ Awaiting payment for '${vendors[index].businessName}'...`)\n//     try {\n//       let cUSDcontract = await kit.contracts.getStableToken();\n//       const result = await contract.methods\n//         .createTransaction(index, vendors[index].vendorAddress)\n//         .send({ from: kit.defaultAccount, value: vendors[index].price, feeCurrency: cUSDcontract.address })\n//       notification(`🎉 You successfully hired '${vendors[index].businessName}'.`)\n//\n//       console.log(result)\n//       getVendors()\n//       getBalance()\n//     } catch (error) {\n//       notification(`⚠️ ${error}.`)\n//     }\n//   }\n// })//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvam9icy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qb2JzLmpzP2Q2MDYiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIGltcG9ydCBCaWdOdW1iZXIgZnJvbSAnYmlnbnVtYmVyLmpzJ1xuLy8gaW1wb3J0IGVyYzIwQWJpIGZyb20gJy4uL2NvbnRyYWN0L2VyYzIwLmFiaS5qc29uJ1xuLy8gaW1wb3J0ICcuL25hdmlnYXRpb24nXG4vLyBpbXBvcnQgJy4vdHJhbnNhY3Rpb25zJ1xuLy9cbi8vIGltcG9ydCB7XG4vLyAgIEVSQzIwX0RFQ0lNQUxTLFxuLy8gICBNUENvbnRyYWN0QWRkcmVzcyxcbi8vICAgY1VTRENvbnRyYWN0QWRkcmVzcyxcbi8vICAgY29ubmVjdENlbG9XYWxsZXQsXG4vLyAgIG5vdGlmaWNhdGlvbixcbi8vICAgbm90aWZpY2F0aW9uT2ZmLFxuLy8gICBraXQsXG4vLyAgIGNvbnRyYWN0XG4vLyB9IGZyb20gJy4vY29tbW9uJ1xuLy9cbi8vXG4vLyBsZXQgdmVuZG9ycyA9IFtdXG4vL1xuLy9cbi8vXG4vLyBhc3luYyBmdW5jdGlvbiBhcHByb3ZlKF9wcmljZSkge1xuLy8gICBjb25zdCBjVVNEQ29udHJhY3QgPSBuZXcga2l0LndlYjMuZXRoLkNvbnRyYWN0KGVyYzIwQWJpLCBjVVNEQ29udHJhY3RBZGRyZXNzKVxuLy9cbi8vICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY1VTRENvbnRyYWN0Lm1ldGhvZHNcbi8vICAgICAuYXBwcm92ZShNUENvbnRyYWN0QWRkcmVzcywgX3ByaWNlKVxuLy8gICAgIC5zZW5kKHsgZnJvbToga2l0LmRlZmF1bHRBY2NvdW50IH0pXG4vLyAgIHJldHVybiByZXN1bHRcbi8vIH1cbi8vXG4vLyBjb25zdCBnZXRCYWxhbmNlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuLy8gICBjb25zdCB0b3RhbEJhbGFuY2UgPSBhd2FpdCBraXQuZ2V0VG90YWxCYWxhbmNlKGtpdC5kZWZhdWx0QWNjb3VudClcbi8vICAgY29uc3QgY1VTREJhbGFuY2UgPSB0b3RhbEJhbGFuY2UuY1VTRC5zaGlmdGVkQnkoLUVSQzIwX0RFQ0lNQUxTKS50b0ZpeGVkKDIpXG4vLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWxhbmNlJykudGV4dENvbnRlbnQgPSBjVVNEQmFsYW5jZVxuLy8gfVxuLy9cbi8vIGNvbnN0IGdldFZlbmRvcnMgPSBhc3luYyBmdW5jdGlvbigpIHtcbi8vICAgY29uc3QgX3ZlbmRvckxlbmd0aCA9IGF3YWl0IGNvbnRyYWN0Lm1ldGhvZHMuZ2V0VmVuZG9yQ291bnQoKS5jYWxsKClcbi8vICAgY29uc3QgX3ZlbmRvcnMgPSBbXVxuLy9cbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfdmVuZG9yTGVuZ3RoOyBpKyspIHtcbi8vICAgICBsZXQgX3ZlbmRvciA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4vLyAgICAgICBsZXQgcCA9IGF3YWl0IGNvbnRyYWN0Lm1ldGhvZHMuZ2V0VmVuZG9ycyhpKS5jYWxsKClcbi8vICAgICAgIHAuaW5kZXggPSBpXG4vL1xuLy8gICAgICAgcmVzb2x2ZShwKVxuLy8gICAgIH0pXG4vLyAgICAgX3ZlbmRvcnMucHVzaChfdmVuZG9yKVxuLy8gICB9XG4vL1xuLy8gICB2ZW5kb3JzID0gYXdhaXQgUHJvbWlzZS5hbGwoX3ZlbmRvcnMpXG4vLyAgIGNvbnNvbGUubG9nKHZlbmRvcnMpXG4vLyAgIHJlbmRlclZlbmRvcnMoKVxuLy8gfVxuLy9cbi8vIGZ1bmN0aW9uIHJlbmRlclZlbmRvcnMoKSB7XG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXRwbGFjZScpLmlubmVySFRNTCA9ICcnXG4vLyAgIHZlbmRvcnMuZm9yRWFjaCgoX3ZlbmRvcikgPT4ge1xuLy8gICAgIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4vLyAgICAgbmV3RGl2LmNsYXNzTmFtZSA9ICdjb2wtbWQtNCdcbi8vICAgICBuZXdEaXYuaW5uZXJIVE1MID0gdmVuZG9yVGVtcGxhdGUoX3ZlbmRvcilcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFya2V0cGxhY2UnKS5hcHBlbmRDaGlsZChuZXdEaXYpXG4vLyAgIH0pXG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gdmVuZG9yVGVtcGxhdGUoX3ZlbmRvcikge1xuLy8gICByZXR1cm4gYFxuLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkIG1iLTRcIj5cbi8vICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIke192ZW5kb3IuZmlsZVBhdGh9XCIgYWx0PVwiLi4uXCI+XG4vLyAgICAgICA8ZGl2IGNsYXNzPVwicG9zaXRpb24tYWJzb2x1dGUgdG9wLTAgZW5kLTAgYmctd2FybmluZyBtdC00IHB4LTIgcHktMSByb3VuZGVkLXN0YXJ0XCI+XG4vLyAgICAgICAgICR7X3ZlbmRvci50cmFuc0NvdW50fSBUcmFuc2FjdGlvbnNcbi8vICAgICAgIDwvZGl2PlxuLy8gICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keSB0ZXh0LWxlZnQgcC00IHBvc2l0aW9uLXJlbGF0aXZlXCI+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFuc2xhdGUtbWlkZGxlLXkgcG9zaXRpb24tYWJzb2x1dGUgdG9wLTBcIj5cbi8vICAgICAgICAgJHtpZGVudGljb25UZW1wbGF0ZShfdmVuZG9yLnZlbmRvckFkZHJlc3MpfVxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPGgyIGNsYXNzPVwiY2FyZC10aXRsZSBmcy00IGZ3LWJvbGQgbXQtMlwiPiR7X3ZlbmRvci5idXNpbmVzc05hbWV9PC9oMj5cbi8vICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHQgbWItNFwiIHN0eWxlPVwibWluLWhlaWdodDogODJweFwiPlxuLy8gICAgICAgICAgICR7X3ZlbmRvci5kZXNjcmlwdGlvbn1cbi8vICAgICAgICAgPC9wPlxuLy9cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImQtZ3JpZCBnYXAtMlwiPlxuLy8gICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1sZyBidG4tb3V0bGluZS1kYXJrIGhpcmVCdG4gZnMtNiBwLTNcIiBpZD0ke1xuLy8gICAgIF92ZW5kb3IuaW5kZXhcbi8vICAgfT5cbi8vXG4vLyAgICAgICAgICAgICBIaXJlIGZvciAke25ldyBCaWdOdW1iZXIoX3ZlbmRvci5wcmljZSkuc2hpZnRlZEJ5KC1FUkMyMF9ERUNJTUFMUykudG9GaXhlZCgyKX0gY1VTRFxuLy8gICAgICAgICAgIDwvYT5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICA8L2Rpdj5cbi8vICAgYFxuLy8gfVxuLy9cbi8vIGZ1bmN0aW9uIGlkZW50aWNvblRlbXBsYXRlKF9hZGRyZXNzKSB7XG4vLyAgIGNvbnN0IGljb24gPSBibG9ja2llc1xuLy8gICAgIC5jcmVhdGUoe1xuLy8gICAgICAgc2VlZDogX2FkZHJlc3MsXG4vLyAgICAgICBzaXplOiA4LFxuLy8gICAgICAgc2NhbGU6IDE2LFxuLy8gICAgIH0pXG4vLyAgICAgLnRvRGF0YVVSTCgpXG4vL1xuLy8gICByZXR1cm4gYFxuLy8gICA8ZGl2IGNsYXNzPVwicm91bmRlZC1jaXJjbGUgb3ZlcmZsb3ctaGlkZGVuIGQtaW5saW5lLWJsb2NrIGJvcmRlciBib3JkZXItd2hpdGUgYm9yZGVyLTIgc2hhZG93LXNtIG0tMFwiPlxuLy8gICAgIDxhIGhyZWY9XCJodHRwczovL2FsZmFqb3Jlcy1ibG9ja3Njb3V0LmNlbG8tdGVzdG5ldC5vcmcvYWRkcmVzcy8ke19hZGRyZXNzfS90cmFuc2FjdGlvbnNcIlxuLy8gICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIj5cbi8vICAgICAgICAgPGltZyBzcmM9XCIke2ljb259XCIgd2lkdGg9XCI0OFwiIGFsdD1cIiR7X2FkZHJlc3N9XCI+XG4vLyAgICAgPC9hPlxuLy8gICA8L2Rpdj5cbi8vICAgYFxuLy8gfVxuLy9cbi8vXG4vL1xuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhc3luYyAoKSA9PiB7XG4vLyAgIC8vIG5vdGlmaWNhdGlvbign4oybIExvYWRpbmcuLi4nKVxuLy8gICBhd2FpdCBjb25uZWN0Q2Vsb1dhbGxldCgpXG4vLyAgIGF3YWl0IGdldEJhbGFuY2UoKVxuLy8gICBhd2FpdCBnZXRWZW5kb3JzKClcbi8vICAgYXdhaXQgdGVzdCgpXG4vL1xuLy8gICAvLyBub3RpZmljYXRpb25PZmYoKVxuLy8gfSk7XG4vL1xuLy8gZG9jdW1lbnRcbi8vICAgLnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGVBY2NvdW50QnRuJylcbi8vICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcbi8vICAgICBjb25zdCBwYXJhbXMgPSBbXG4vLyAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzaW5lc3NOYW1lJykudmFsdWUsXG4vLyAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmVzc2lvbicpLnZhbHVlLFxuLy8gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVQYXRoJykudmFsdWUsXG4vLyAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZSxcbi8vICAgICAgIG5ldyBCaWdOdW1iZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaWNlJykudmFsdWUpXG4vLyAgICAgICAgIC5zaGlmdGVkQnkoRVJDMjBfREVDSU1BTFMpXG4vLyAgICAgICAgIC50b1N0cmluZygpXG4vLyAgICAgXVxuLy8gICAgIG5vdGlmaWNhdGlvbihg4oybIEFkZGluZyAnJHtwYXJhbXNbMF19Jy4uLmApXG4vLyAgICAgdHJ5IHtcbi8vICAgICAgIGF3YWl0IGNvbnRyYWN0Lm1ldGhvZHNcbi8vICAgICAgICAgLmNyZWF0ZVZlbmRvciguLi5wYXJhbXMpXG4vLyAgICAgICAgIC5zZW5kKHsgZnJvbToga2l0LmRlZmF1bHRBY2NvdW50IH0pXG4vLyAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgIG5vdGlmaWNhdGlvbihg4pqg77iPICR7ZXJyb3J9LmApXG4vLyAgICAgfVxuLy8gICAgIG5vdGlmaWNhdGlvbihg8J+OiSBBY2NvdW50IHN1Y2Nlc3NmdWxseSBjcmVhdGVkICcke3BhcmFtc1swXX0nLmApXG4vLyAgICAgZ2V0VmVuZG9ycygpXG4vLyAgIH0pXG4vL1xuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcmtldHBsYWNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xuLy8gICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lLmluY2x1ZGVzKCdoaXJlQnRuJykpIHtcbi8vICAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmlkXG4vLyAgICAgLy8gbm90aWZpY2F0aW9uKCfijJsgV2FpdGluZyBmb3IgcGF5bWVudCBhcHByb3ZhbC4uLicpXG4vLyAgICAgLy8gdHJ5IHtcbi8vICAgICAvLyAgIGF3YWl0IGFwcHJvdmUocHJvZHVjdHNbaW5kZXhdLnByaWNlKVxuLy8gICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgLy8gICBub3RpZmljYXRpb24oYOKaoO+4jyAke2Vycm9yfS5gKVxuLy8gICAgIC8vIH1cbi8vICAgICAvLyByZXR1cm4gY29uc29sZS5sb2coaW5kZXgpXG4vLyAgICAgbm90aWZpY2F0aW9uKGDijJsgQXdhaXRpbmcgcGF5bWVudCBmb3IgJyR7dmVuZG9yc1tpbmRleF0uYnVzaW5lc3NOYW1lfScuLi5gKVxuLy8gICAgIHRyeSB7XG4vLyAgICAgICBsZXQgY1VTRGNvbnRyYWN0ID0gYXdhaXQga2l0LmNvbnRyYWN0cy5nZXRTdGFibGVUb2tlbigpO1xuLy8gICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29udHJhY3QubWV0aG9kc1xuLy8gICAgICAgICAuY3JlYXRlVHJhbnNhY3Rpb24oaW5kZXgsIHZlbmRvcnNbaW5kZXhdLnZlbmRvckFkZHJlc3MpXG4vLyAgICAgICAgIC5zZW5kKHsgZnJvbToga2l0LmRlZmF1bHRBY2NvdW50LCB2YWx1ZTogdmVuZG9yc1tpbmRleF0ucHJpY2UsIGZlZUN1cnJlbmN5OiBjVVNEY29udHJhY3QuYWRkcmVzcyB9KVxuLy8gICAgICAgbm90aWZpY2F0aW9uKGDwn46JIFlvdSBzdWNjZXNzZnVsbHkgaGlyZWQgJyR7dmVuZG9yc1tpbmRleF0uYnVzaW5lc3NOYW1lfScuYClcbi8vXG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4vLyAgICAgICBnZXRWZW5kb3JzKClcbi8vICAgICAgIGdldEJhbGFuY2UoKVxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgICBub3RpZmljYXRpb24oYOKaoO+4jyAke2Vycm9yfS5gKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfSkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/jobs.js\n");

/***/ })

/******/ });