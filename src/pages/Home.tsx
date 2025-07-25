
const Home = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
  return (
    <div>
        <h1>name:{user?.name}</h1>
        <h1>email:{user?.email}</h1>
    </div>
  )
}

export default Home