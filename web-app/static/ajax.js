const Ajax = Object.create(null);

const json = (response) => response.json();

// Ajax.query = function (requestObj) {
//     return window
//         .fetch("/", {
//             method: "POST",
//             body: JSON.stringify(requestObj),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(json);
// };

Ajax.query = function (requestObj) {
    return new Promise(function (resolve, reject) {
        window
            .fetch("/", {
                method: "POST",
                body: JSON.stringify(requestObj),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(new Error('Ajax query failed with status ' + response.status));
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
};


export default Object.freeze(Ajax);
