const links = JSON.parse(localStorage.getItem("links"));
const hasMap = links ? links : [
    {logo: 'A', logoType: 'text', url: "https://www.acfun.cn"},
    {logo: 'B', logoType: 'text', url: "https://bilibili.com"},
]

const $siteList = $(".siteList");
const $last = $siteList.find("li.last")
function simplifyUrl (url) {
    return url.replace("http://", "")
            .replace("https://","")
            .replace("www.", "")
            .replace(/\/.*/,  '')
}
// function removeLink (event,index) {
//     hasMap.splice(index, 1);
//     event.stopPropagation();
//     console.log(event, index,)
// }
const render = () => {
    
    $siteList.find("li:not(.last)").remove();
    hasMap.forEach( (node, index) =>{ 
        // const $li = $(
        // `
        // <li>
        //     <a href="${node.url}">
        //         <div class="site">
        //             <div class="remove">
        //                 <svg class="icon" aria-hidden="true">
        //                     <use xlink:href="#icon-delete"></use>
        //                 </svg>
        //             </div>
        //             <div class="logo">
        //                 ${node.logo}
        //             </div>
        //             <div class="link">
        //                 ${simplifyUrl(node.url)}
        //             </div>
        //         </div>
        //     </a>
    
        // </li>
        // `
        // ).insertBefore($last);
        const $li = $(
        `
        <li>
                <div class="site">
                    <div class="remove">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                    <div class="logo">
                        ${node.logo}
                    </div>
                    <div class="link">
                        ${simplifyUrl(node.url)}
                    </div>
                </div>
    
        </li>
        `
        ).insertBefore($last);
        $li.on(
            'click', ()=>{
                window.open(node.url);
            }
        );
        $li.on(
            'click',
            '.remove',
            (e) => {
                hasMap.splice(index, 1);
                render();
                e.stopPropagation()
            }
        )
    });

}


render()
$(".addButton")
.on("click", () => {
    let url = window.prompt("请输入新增网址：");
    if(url.indexOf('http') !== 0 || url.indexOf('https') !== 0){
        url = "https://" + url;
    }
    hasMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    })
    render();
    // const $site = $(
    //     `
    //     <li>
    //         <a href="${url}">
    //             <div class="site">
    //                 <div class="logo">
    //                     ${url.split("//")[1][0].toLocaleUpperCase()}
    //                 </div>
    //                 <div class="link">${url}</div>
    //             </div>
    //         </a>

    //     </li>
    //     `
    // ).insertBefore($last)
})

window.onbeforeunload = () => {
    const str = JSON.stringify(hasMap);
    window.localStorage.setItem("links", str)
}

$(document).on("keypress", (e) => {
    const {key} = e;
    for(let i = 0; i < hasMap.length; i++){
        if(hasMap[i].logo.toLowerCase() === key.toLowerCase()){
            window.open(hasMap[i].url);
            break;
        }
    }
})
$(".search").on("keypress", (e) => {
    e.stopPropagation()
})
