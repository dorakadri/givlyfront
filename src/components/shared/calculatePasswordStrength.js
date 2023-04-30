export  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8 && password.length <= 20) {
      strength += 20;
    }
    if (password.match(/[a-z]/)) {
      strength += 20;
    }
    if (password.match(/[A-Z]/)) {
      strength += 20;
    }
    if (password.match(/\d/)) {
      strength += 20;
    }
    if (password.match(/[!@#$%^&*()_+}{"':;?/>.<,]/)) {
      strength += 20;
    }
    return strength;
  };