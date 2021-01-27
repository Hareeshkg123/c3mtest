import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';

// import { CgmConfig } from 'cm-commons/utils';

const init = (): void => {
    // const config = CgmConfig.all();
    const { username, password } = {username:'admin' ,password:'admin'};

    passport.use(new BasicStrategy((uname: string, pwd: string, done: any) => {
        if (username === uname && password === pwd) {
            return done(null, true);
        }
        return done(null, false);
    }));
}

const authenticate = (): any => passport.authenticate('basic', { session: false });

export { init, authenticate };