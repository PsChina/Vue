export function shouldUpdateComponent(n1, n2){
    const { props: prevProps } = n1
    const { props: nextProps } = n2
    for(const key in nextProps){
        if(nextProps[key]!==prevProps[key]){
            return true
        }
    }
    return false
}