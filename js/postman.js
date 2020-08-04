let parambox=document.getElementById('parameterbox');
parambox.style.display='none';

function getnode(str)
{
    let div=document.createElement('div');
    div.innerHTML=str;
    return div.firstElementChild;
}


let jsonbox=document.getElementById('jsonbox');

let json=document.getElementById('jsonradio');
json.addEventListener('click',function()
{
        jsonbox.style.display='block';
        parambox.style.display='none';
        document.getElementById('extraparam').style.display='none';
}
)

let param=document.getElementById('customradio');
param.addEventListener('click',function()
{
    jsonbox.style.display='none';
        parambox.style.display='block';   
        document.getElementById('extraparam').style.display='block';
})

let paramcnt=2;
let addparam=document.getElementById('addparam');
addparam.addEventListener('click',function()
{
    console.log('clicked');
    let str=` <div class="form-row">
    <div class="col-md-5 mb-3">
        <label for="param${paramcnt}">KEY</label>
        <input type="text" class="form-control" id="paramkey${paramcnt}" required placeholder="Enter Key ${paramcnt}">
        <div class="valid-feedback">
            Looks good!
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <label for="param${paramcnt}">VALUE</label>
        <input type="text" class="form-control" id="paramval${paramcnt}" required placeholder="Enter Value ${paramcnt}">
        <div class="valid-feedback">
            Looks good!
        </div>
    </div>
    <button class="btn btn-primary removeparam" style="margin-top:30px;margin-bottom: 20px;margin-left: 3px;">-</button>
</div>`;
paramcnt++;
let node=getnode(str);
document.getElementById('extraparam').appendChild(node);
let removeparam=document.getElementsByClassName('removeparam');
for(item of removeparam)
{
    item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
    })
}
})

let submit=document.getElementById('submit');
submit.addEventListener('click',function()
{
    let response=document.getElementById('response');
    response.value='Fetching....Please Wait';
    let url=document.getElementById('url').value;
    let requestype=document.querySelector("input[name='requesttype']:checked").value;
    let contenttype=document.querySelector("input[name='contenttype']:checked").value;

    if(contenttype=='option2')
    {
        data={};
        for(i=1;i<paramcnt;i++)
        {
            if(document.getElementById('paramkey'+i)!=undefined)
            {
                let key=document.getElementById('paramkey'+i).value;
                let val=document.getElementById('paramval'+i).value;
                data[key]=val;
            }
        }
        data=JSON.stringify(data);
    }
    else
    {
        data=document.getElementById('requestjson').value;
    }
    if(requestype=='option1')
    {
        fetch(url,{
            method:'GET',
        }).then(function(response){
            return response.text();
        }).then(function(data){
            document.getElementById('response').value=data
        })
    }
    else
    {
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(function(response){
            return response.text();
        }).then(function(data){
            document.getElementById('response').value=data
        })
    }
})