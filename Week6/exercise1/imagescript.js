
function onStreamProcessed(text) 
    {
    console.log(text);
    const_urlList = text.split('\n');
    for(const url of const_urlList ) 
        {
        const img = document.createElement('img');
        img.src = url;
        document.body.append(img);
        }
    }

function onSuccess(response) 
    {
    console.log(response.status);
    response.text().then(onStreamProcessed);  
    }

function onError(error) 
    {
    console.error('Error fetching images:', error);
    }

fetch('./images.txt').then(onSuccess, onError)