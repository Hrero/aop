function a() {
    return new Promise((r,j) => {
        setTimeout(() => {
            j(3)
        }, 1000)
    })
}


async function b() {
    a().catch((aaa) => {
        console.log(1, aaa);
    })
    // try {
    //     a().finally((aaa) => {
    //         console.log(1, aaa);
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

}

b()