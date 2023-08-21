// INSERT Button
const insertCheck = () => {
    if( window.confirm("레벨 단계를 추가하시겠습니까?") ){

    }else{
        return;
    }
    fetch("/blank_question/level_insert",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            if(result == 1){
                location.reload();
            }
        })
}

// DELETE Button
const deleteCheck = () => {
    if( window.confirm("blank Game에 연관된 모든 List가 함께 삭제됩니다. \n\n삭제하시겠습니까?") ){

    }else{
        return;
    }
    fetch("/blank_question/level_delete",
        {
            method: "get"
        })
        .then(res => res.json())
        .then(result => {
            if(result == 1){
                location.reload();
            }
        })
}