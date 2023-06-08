export interface addUserType {
  id?: number;
  full_name?: string;
  email?: string;
  role?: string;
  team?: string;
  status?: string;
}

export interface addClassType {
  id_class?: number;
  class_name?: string;
  PIC?: string;
  start_date?: string;
  end_date?: string;
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
  id?: number;
  notes?: string;
  users?: string;
  status?: string;
}

export interface PostLogin {
  email?: string;
  password?: string;
}
export interface putUser extends PostLogin {
  full_name?: string;
  confirmPassword?: string;
}
