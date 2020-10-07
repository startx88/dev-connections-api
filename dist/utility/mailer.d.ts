import { UserDoc } from "../models/user";
interface IMail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}
interface mailerBody {
    local: string;
    email: string;
    token: string;
    templateName: string;
    user: UserDoc;
}
declare class Mailer {
    private _transport;
    static emailContainer(body: mailerBody): void;
    constructor();
    sendMail(mailOptions: IMail): void;
}
export { Mailer };
