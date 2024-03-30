export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const API_ROUTES = {
  Login: "/auth/login",
  SignUp: "/auth/signup",
  Logout: "/auth/logout",
  VerifyToken: "/",
  GetAllPosts: "/post/all",
  UpVote: "/post/upvote",
  UnVote: "/post/unvote",
};

export const ResponseStatus = {
  Ok: 200,
  Created: 201,
};

export const Professions: string[] = [
  "Physical Therapist",
  "Dental Hygienist",
  "Nurse Practitioner",
  "Physician Assistant",
  "Physician",
  "Registered Nurse",
  "Occupational Therapist",
  "Home Health Aide",
  "Diagnostic Medical Sonographer",
  "Licensed Practical or Licensed Vocational Nurse",
  "Physical Therapist Assistant",
  "Dental Assistant",
  "Medical Assistant",
  "Medical or Clinical Laboratory Technician",
  "Pharmacist",
  "Surgeon",
  "Radiologic Technologist",
  "Surgical Technologist",
  "Dentist",
  "Emergency Medical Technician/Paramedic",
  "Nursing Assistant",
  "Family Physician or General Practitioner",
  "Speech-language Pathologists",
  "Occupational Therapy Assistant",
  "Anesthesiologist",
  "Medical Records or Health Information Technician",
  "Nurse Anesthetist",
  "Cardiovascular Technologist or Technician",
  "Phlebotomists",
  "Pharmacy Technician",
  "Athletic Trainer",
  "Massage Therapist",
  "Optometrist",
  "Respiratory Therapists",
  "Veterinary Technologist or Technician",
  "Physical Therapist Aide",
  "Chiropractors",
  "Genetic Counselors",
  "Dietitian/Nutritionist",
  "Optician",
  "Internist, General",
  "Audiologist",
  "Veterinarian",
  "MRI Technologist",
  "Ophthalmic Laboratory Technician",
  "Radiation Therapist",
  "Pediatricians",
  "Nuclear Medicine Technologist",
  "Orthotist or Prosthetist",
  "Psychiatrist",
];

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phonenumber: string;
  profession: string;
  profilePic: string | null;
  isVerified: boolean;
  joinedOn: string;
};

export type Post = {
  id: string;
  authorDetails: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePic: string;
    profession: string;
  };
  description: string;
  image?: string;
  tag?: string;
  title: string;
  upvotes: number;
  numberOfComments: number;
  postedOn: string;
  upVoters: { id: string }[];
};
