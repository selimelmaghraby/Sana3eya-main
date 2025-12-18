function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>

      <form>
        <input type="text" placeholder="Full Name" />
        <br /><br />

        <input type="email" placeholder="Email" />
        <br /><br />

        <input type="password" placeholder="Password" />
        <br /><br />

        <select>
          <option>Worker</option>
          <option>Client</option>
        </select>
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
