@Post('/registerCustomer')
  async registerUser(@Req() req, @Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(400).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'ufficio'
      ) {
        const newUser = req.body;
        console.log({ newUser });
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(newUser.password, salt);
        const userLoginEntity = {
          userCustomer: '',
          email: newUser.email,
          password: hash,
          is_active: true,
        };
        const userCustomerEntity = {
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          birth_date: moment(newUser.birthDate, 'DD-MM-YYYY').toDate(),
          phone_number: newUser.phoneNumber,
          country: newUser.country,
          province: newUser.province,
          city: newUser.city,
          zip_code: newUser.zipCode,
          address: newUser.address,
        };
        const userCustomerData = await this.userCustomerService.verifyUserData(
          userCustomerEntity,
        );
        if (userCustomerData != null) {
          //USER CUSTOMER ESISTE
          const result = await this.userCustomerService.updateInfoLogin(
            userCustomerData.dataValues,
            userCustomerEntity,
          );
          console.log({ result });
          userLoginEntity.userCustomer = result;
          const userLoginData = await this.userLoginService.verifyUserLogin(
            userLoginEntity,
          );
          if (userLoginData == null) {
            //NON ESISTONO INFORMAZIONI DELLA LOGIN
            console.log("USER CUSTOMER ESISTE, NON ESISTE L'ENTITA LOGIN");
            console.log({ userLoginEntity });
            try {
              const newCreatedUserLogin =
                await this.userLoginService.createUser(userLoginEntity);
              console.log({ newCreatedUserLogin });
              res.status(201).json({ result: 'user created successufuly' });
              return;
            } catch (err) {
              console.log({ err });
              res.status(500).json({ result: 'internal server error' });
              return;
            }
          } else {
            if (userLoginData.is_active == 1) {
              console.log("USER CUSTOMER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
              res
                .status(409)
                .json({ result: 'email or phonenumber already in use' });
              return;
            } else {
              console.log(
                'USER CUSTOMER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA',
              );
              try {
                const newCreatedUserLogin =
                  await this.userLoginService.createUser(userLoginEntity);
                console.log({ newCreatedUserLogin });
                res.status(201).json({ result: 'user created successufuly' });
                return;
              } catch (err) {
                console.log();
                console.log(err);
                if ((err = 'ER_DUP_ENTRY')) {
                  try {
                    await this.userLoginService.updateUserStatus(
                      userLoginEntity.email,
                    );
                    res
                      .status(201)
                      .json({ result: 'user created successufuly' });
                    return;
                  } catch (err) {
                    res.status(500).json({ result: 'internal server error' });
                    return;
                  }
                } else {
                  res.status(500).json({ result: 'internal server error' });
                  return;
                }
              }
            }
          }
        } else {
          //NON ESISTE ENTITA USER CUSTOMER
          const userLoginData = await this.userLoginService.verifyUserLogin(
            userLoginEntity,
          );
          if (userLoginData == null) {
            console.log("USER CUSTOMER NON ESISTE, NON ESISTE L'ENTITA LOGIN");
            //NON ESISTE ENITITA USER LOGIN
            const newCreatedUserCustomer =
              await this.userCustomerService.createUser(userCustomerEntity);
            console.log({ newCreatedUserCustomer });
            userLoginEntity.userCustomer =
              newCreatedUserCustomer.id_user_customer;
            console.log({ userLoginEntity });
            try {
              const newCreatedUserLogin =
                await this.userLoginService.createUser(userLoginEntity);
              console.log({ newCreatedUserLogin });
              res.status(201).json({ result: 'user created successufuly' });
            } catch (err) {
              console.log({ err });
              res.status(500).json({ result: 'internal server error' });
              return;
            }
          } else {
            console.log("USER CUSTOMER NON ESISTE, ESISTE L'ENTITA LOGIN ");
            res
              .status(409)
              .json({ result: 'email or phonenumber already in use' });
            return;
          }
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return;
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }
