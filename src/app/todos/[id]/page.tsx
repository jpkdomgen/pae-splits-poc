import Link from "next/link";

export default function({ params }){

    console.log(JSON.stringify(params));

    return <main>
        <h1>To Do Details</h1>
        <p>{params.id}</p>
        <p><Link href="/todos">Back to Todos</Link></p>
        <p><Link href="/">Back to Home</Link></p>
    </main>
}