async function buttonAdd(obj){
    const pid =  await obj.getAttribute('pid')
    //const cid =  document.getElementById('cart').innerHTML;

    console.log(pid)

    /*
    no pude resolver el boton el el front JK

    fetch(`/api/carts/${cid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{product: pid, quantity: 1}])
    })
    .then(res => res.json()
    .then(data => alert(data)))*/
}

async function nextPage(obj){
    let params = new URLSearchParams(window.location.search);
    const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

    params.set('page', activePage+1)

    window.location.href = `/products?${params.toString()}`
}

async function prevPage(obj){
    let params = new URLSearchParams(window.location.search);
    const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

    params.set('page', activePage-1)

    window.location.href = `/products?${params.toString()}`
}