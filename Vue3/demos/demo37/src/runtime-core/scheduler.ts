const queue:any[] = []

let isFlushPending = false

const p = Promise.resolve()

export function nextTick(fn){
    return fn ? p.then(fn) : p
}

export function queueJobs(job){
    if(isFlushPending) return 
    isFlushPending = true
    if(!queue.includes(job)){
        queue.push(job)
    }

    nextTick(()=>{
        isFlushPending = false
        let job;
        while(job = queue.shift()){
            job && job()
        }
    })
}

