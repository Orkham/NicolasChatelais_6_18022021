export function firstLetterUp(str){
    return (str + '').charAt(0).toUpperCase()+str.substr(1);
}
export function nameById(id){
    switch(id){
        case 243:
        return "Mimi";
        case 930:
        return "Ellie Rose";
        case 82:
        return "Tracy";
        case 527:
        return "Nabeel";
        case 925:
        return "Rhode";
        case 195:
        return "Marcel";
    }
}
export function transformTitle(image,video){
    let re = /_/g;
    if(image){
        let beautifulTitle = image.replace(re, " ").slice(0,-4);
        return beautifulTitle;
    }else{
        let beautifulTitle = video.replace(re, " ").slice(0,-4);
        return beautifulTitle;
    }
}