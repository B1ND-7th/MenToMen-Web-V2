import axios from "axios";
import CONFIG from "../../config.json";
import { LoginResponse } from "../../interface/login/login.type";
import { LoginParam } from "./auth.param";

class AuthRepository {
  public async login({ code }: LoginParam): Promise<LoginResponse> {
    const { data } = await axios.post(`${CONFIG}/auth/code`, { code });
    return data;
  }
}

export default new AuthRepository();
