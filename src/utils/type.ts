export interface addUserType {
  id?: number;
  full_name?: string;
  email?: string;
  role?: string;
  team?: string;
  status?: string;
  password?: string;
  id_team?: number;
  name?: string;
}

export interface addClassType {
  id?: number;
  name?: string;
  pic?: number;
  start_date?: string;
  graduate_date?: string;
}

export interface addMenteeType {
  full_name?: string;
  nick_name?: string;
  email?: string;
  phone?: number;
  current_address?: string;
  home_address?: string;
  telegram?: string;
  gender?: string;
  education_type?: string;
  major?: string;
  graduate?: number;
  institution?: string;
  emergency_name?: string;
  emergency_phone?: number;
  emergency_status?: string;
  status?: string;
  class_id?: 1;
}

export interface addFeedbackType {
  notes?: string;
  id_user?: number;
  id_mentee?: number;
  id_status?: number;
  proof?: string;
}

export interface PostLogin {
  email?: string;
  password?: string;
}
export interface putUser extends PostLogin {
  full_name?: string;
  confirmPassword?: string;
}

export interface usersType {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  id_team?: number;
  status?: boolean;
}

export interface menteesType {
  id?: number;
  id_class?: number;
  full_name?: string;
  nick_name?: string;
  email?: string;
  phone?: string;
  current_address?: string;
  home_address?: string;
  telegram?: string;
  id_status?: number;
  gender?: string;
  education_type?: string;
  major?: string;
  graduate?: number;
  institution?: string;
  emergency_name?: string;
  emergency_phone?: string;
  emergency_status?: string;
}
