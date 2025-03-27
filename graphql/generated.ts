import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type ApplicationModule = {
  __typename?: 'ApplicationModule';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Breakdown = {
  __typename?: 'Breakdown';
  breakdownDate: Scalars['DateTime']['output'];
  breakdownDescription?: Maybe<Scalars['String']['output']>;
  breakdownLocation: Scalars['String']['output'];
  breakdownType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  media: Array<BreakdownMedia>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type BreakdownMedia = {
  __typename?: 'BreakdownMedia';
  breakdown: Breakdown;
  breakdownId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mediaType: Scalars['String']['output'];
  mediaUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BreakdownMediaDto = {
  breakdownId: Scalars['Float']['input'];
  mediaType?: InputMaybe<Scalars['String']['input']>;
  mediaUrl: Array<Scalars['String']['input']>;
};

export type BreakdownStatusDto = {
  id: Scalars['Float']['input'];
  status: Status;
};

export type ChangePasswordDto = {
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type Coupon = {
  __typename?: 'Coupon';
  couponCode: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: Scalars['String']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount: Scalars['Float']['output'];
  minOrderAmount: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

/** Coupon Status */
export enum CouponStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive',
  Used = 'used'
}

export type CouponStatusDto = {
  id: Scalars['Float']['input'];
  status: CouponStatus;
};

export type CreateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  vehicleId: Scalars['Float']['input'];
};

export type CreateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  endDate: Scalars['String']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  createdByUserId?: InputMaybe<Scalars['Float']['input']>;
  endTime: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTaskDto = {
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent: Scalars['Float']['input'];
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  meRefId: Scalars['String']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  ownerId?: InputMaybe<Scalars['Float']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
  task?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMeetingTypeDto = {
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateModuleDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  uploadDoc: Scalars['String']['input'];
};

export type CreateOfferDto = {
  cashbackAmount: Scalars['Float']['input'];
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateOrganizationDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePermissionDto = {
  action: Scalars['String']['input'];
  appName: AppName;
  description: Scalars['String']['input'];
  module: Scalars['String']['input'];
};

export type CreateProjectDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
};

export type CreateRoleDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds: Array<Scalars['Float']['input']>;
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  mobileNo: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
  roleId: Scalars['Float']['input'];
};

export type CreateVehicleDto = {
  chassisNumber: Scalars['String']['input'];
  color: Scalars['String']['input'];
  insurance: Scalars['String']['input'];
  maintenanceHistory: Scalars['String']['input'];
  make: Scalars['String']['input'];
  model: Scalars['String']['input'];
  numberPlate: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
  year: Scalars['String']['input'];
};

/** Custom Status */
export enum CustomStatus {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive',
  Pending = 'pending'
}

export type Dashboard = {
  __typename?: 'Dashboard';
  activeMeetings?: Maybe<Scalars['Int']['output']>;
  inactiveMeetings?: Maybe<Scalars['Int']['output']>;
  totalMeetings?: Maybe<Scalars['Int']['output']>;
};

export type DashboardCount = {
  __typename?: 'DashboardCount';
  assignedPermissionCount?: Maybe<Scalars['Int']['output']>;
  organizationCount?: Maybe<Scalars['Int']['output']>;
  permissionCount?: Maybe<Scalars['Int']['output']>;
  projectCount?: Maybe<Scalars['Int']['output']>;
  roleCount?: Maybe<Scalars['Int']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
};

export type DashboardFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

/** Discount type for coupon */
export enum DiscountType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type Group = {
  __typename?: 'Group';
  name: Scalars['String']['output'];
  permissions: Array<Permissions>;
};

export type ListInputDto = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

export type LoginRes = {
  __typename?: 'LoginRes';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Meeting = {
  __typename?: 'Meeting';
  attendees?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  createdByUserId?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meetingAgenda?: Maybe<Scalars['String']['output']>;
  meetingDate: Scalars['DateTime']['output'];
  meetingReference: Scalars['String']['output'];
  meetingType?: Maybe<MeetingType>;
  meetingTypeId?: Maybe<Scalars['Float']['output']>;
  meetingUrl?: Maybe<Scalars['String']['output']>;
  meetingVenue?: Maybe<MeetingVenue>;
  meetingVenueId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Array<Notes>>;
  organizationId?: Maybe<Scalars['Float']['output']>;
  parentMeetingId?: Maybe<Scalars['Float']['output']>;
  projectId?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  task?: Maybe<Array<MeetingTask>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type MeetingTask = {
  __typename?: 'MeetingTask';
  comment?: Maybe<Scalars['String']['output']>;
  completePercent?: Maybe<Scalars['Float']['output']>;
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  meRefId: Scalars['String']['output'];
  meetingId?: Maybe<Scalars['Float']['output']>;
  meetingTask?: Maybe<Meeting>;
  notesId?: Maybe<Scalars['Float']['output']>;
  notesTask?: Maybe<Notes>;
  openedDate?: Maybe<Scalars['DateTime']['output']>;
  organizationId?: Maybe<Scalars['Float']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  priority: Scalars['String']['output'];
  projectId?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  task?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['Float']['output']>;
};

export type MeetingType = {
  __typename?: 'MeetingType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meetings?: Maybe<Array<Meeting>>;
  name: Scalars['String']['output'];
  organizationId: Scalars['Float']['output'];
};

export type MeetingVenue = {
  __typename?: 'MeetingVenue';
  address?: Maybe<Scalars['String']['output']>;
  contactNumber?: Maybe<Scalars['Float']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<Array<Meeting>>;
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Module = {
  __typename?: 'Module';
  groups: Array<Group>;
  name: Scalars['String']['output'];
};

export type ModuleStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMediaToBreakdown: Array<BreakdownMedia>;
  assignPermissionsToRole: Role;
  assignRoleToUser: User;
  changeBreakdownStatus: Breakdown;
  changeCouponStatus: Coupon;
  changeModuleStatus: ApplicationModule;
  changeOfferStatus: Offer;
  changePassword: Scalars['Boolean']['output'];
  createBreakdown: Breakdown;
  createCoupon: Coupon;
  createMeeting: Meeting;
  createMeetingTask: MeetingTask;
  createMeetingType: MeetingType;
  createMeetingVenue: MeetingVenue;
  createModule: ApplicationModule;
  createNotes: Array<Notes>;
  createOffer: Offer;
  createOrganization: Organization;
  createPermission: Permissions;
  createProject: Project;
  createRole: Role;
  createUser: User;
  createVehicle: Vehicle;
  deleteBreakdown: Breakdown;
  deleteCoupon: Scalars['Boolean']['output'];
  deleteMeting: Scalars['Boolean']['output'];
  deleteMetingTask: Scalars['Boolean']['output'];
  deleteMetingType: Scalars['Boolean']['output'];
  deleteMetingVenue: Scalars['Boolean']['output'];
  deleteModule: Scalars['Boolean']['output'];
  deleteNotes: Scalars['Boolean']['output'];
  deleteOffer: Scalars['Boolean']['output'];
  deleteOrganization: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVehicle: Vehicle;
  enableOrganizationStatus: Organization;
  enableProjectStatus: Project;
  enableVehicleStatus: Vehicle;
  forgotPassword: Scalars['Boolean']['output'];
  hardDeleteCoupon: Scalars['Boolean']['output'];
  hardDeleteModule: Scalars['Boolean']['output'];
  hardDeleteOffer: Scalars['Boolean']['output'];
  hardDeleteOrganization: Scalars['Boolean']['output'];
  hardDeleteProject: Scalars['Boolean']['output'];
  hardDeleteUser: Scalars['Boolean']['output'];
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  register: User;
  requestOtp: OtpRes;
  resetPassword: Scalars['Boolean']['output'];
  restoreCoupon: Scalars['Boolean']['output'];
  restoreModule: Scalars['Boolean']['output'];
  restoreOffer: Scalars['Boolean']['output'];
  restoreOrganization: Scalars['Boolean']['output'];
  restoreProject: Scalars['Boolean']['output'];
  restoreUser: Scalars['Boolean']['output'];
  sendRegistrationOtp: OtpRes;
  updateBreakdown: Breakdown;
  updateCoupon: Coupon;
  updateMeeting: Meeting;
  updateMeetingTask: MeetingTask;
  updateMeetingType: MeetingType;
  updateMeetingVenue: MeetingVenue;
  updateModule: ApplicationModule;
  updateNotes: Notes;
  updateOffer: Offer;
  updateOrganization: Organization;
  updatePermission: Permissions;
  updateProfile: User;
  updateProject: Project;
  updateRole: Role;
  updateUser: User;
  updateVehicle: Vehicle;
};


export type MutationAddMediaToBreakdownArgs = {
  data: BreakdownMediaDto;
};


export type MutationAssignPermissionsToRoleArgs = {
  permissionIds: Array<Scalars['Int']['input']>;
  roleId: Scalars['Int']['input'];
};


export type MutationAssignRoleToUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationChangeBreakdownStatusArgs = {
  data: BreakdownStatusDto;
};


export type MutationChangeCouponStatusArgs = {
  updateCouponStatusInput: CouponStatusDto;
};


export type MutationChangeModuleStatusArgs = {
  updateModuleStatusInput: ModuleStatusDto;
};


export type MutationChangeOfferStatusArgs = {
  updateOfferStatusInput: OfferStatusDto;
};


export type MutationChangePasswordArgs = {
  changePasswordData: ChangePasswordDto;
};


export type MutationCreateBreakdownArgs = {
  data: CreateBreakdownDto;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponDto;
};


export type MutationCreateMeetingArgs = {
  data: CreateMeetingDto;
};


export type MutationCreateMeetingTaskArgs = {
  data: CreateMeetingTaskDto;
};


export type MutationCreateMeetingTypeArgs = {
  data: CreateMeetingTypeDto;
};


export type MutationCreateMeetingVenueArgs = {
  data: CreateMeetingVenueDto;
};


export type MutationCreateModuleArgs = {
  createModuleInput: CreateModuleDto;
};


export type MutationCreateNotesArgs = {
  notesData: Array<CreateNotesDto>;
};


export type MutationCreateOfferArgs = {
  createOfferInput: CreateOfferDto;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationDto;
};


export type MutationCreatePermissionArgs = {
  data: CreatePermissionDto;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectDto;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleDto;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleDto;
};


export type MutationDeleteBreakdownArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMetingArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingTaskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingTypeArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMetingVenueArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteNotesArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteVehicleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEnableOrganizationStatusArgs = {
  data: OrganizationStatusDto;
};


export type MutationEnableProjectStatusArgs = {
  data: ProjectStatusDto;
};


export type MutationEnableVehicleStatusArgs = {
  data: VehicleStatusDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationHardDeleteCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginData: ValidateDto;
};


export type MutationRegisterArgs = {
  registerData: RegisterDto;
};


export type MutationRequestOtpArgs = {
  otpRequestData: OtpRequestDto;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  reset: ValidateDto;
};


export type MutationRestoreCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreModuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreOfferArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationSendRegistrationOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateBreakdownArgs = {
  data: UpdateBreakdownDto;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponDto;
};


export type MutationUpdateMeetingArgs = {
  updateMeetingInput: UpdateMeetingDto;
};


export type MutationUpdateMeetingTaskArgs = {
  updateMeetingTaskInput: UpdateMeetingTaskDto;
};


export type MutationUpdateMeetingTypeArgs = {
  updateMeetingTypeInput: UpdateMeetingTypeDto;
};


export type MutationUpdateMeetingVenueArgs = {
  updateMeetingVenueInput: UpdateMeetingVenueDto;
};


export type MutationUpdateModuleArgs = {
  updateModuleInput: UpdateModuleDto;
};


export type MutationUpdateNotesArgs = {
  updateNotesInput: UpdateNotesDto;
};


export type MutationUpdateOfferArgs = {
  updateOfferInput: UpdateOfferDto;
};


export type MutationUpdateOrganizationArgs = {
  updateOrganizationInput: UpdateOrganizationDto;
};


export type MutationUpdatePermissionArgs = {
  data: UpdatePermissionDto;
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserDto;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectDto;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleDto;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserDto;
};


export type MutationUpdateVehicleArgs = {
  updateVehicleInput: UpdateVehicleDto;
};

export type Notes = {
  __typename?: 'Notes';
  createdAt: Scalars['DateTime']['output'];
  decision?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['Float']['output']>;
  task?: Maybe<Array<MeetingTask>>;
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  cashbackAmount: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: Scalars['String']['output'];
  discountValue: Scalars['Float']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount: Scalars['Float']['output'];
  minOrderAmount: Scalars['Float']['output'];
  offerType: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

/** OFFER STATUS */
export enum OfferStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type OfferStatusDto = {
  id: Scalars['Float']['input'];
  status: OfferStatus;
};

/** Offer Status */
export enum OfferTypeStatus {
  BuyOneGetOne = 'BUY_ONE_GET_ONE',
  Cashback = 'CASHBACK',
  Discount = 'DISCOUNT'
}

export type Organization = {
  __typename?: 'Organization';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type OrganizationStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type OtpRequestDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type OtpRes = {
  __typename?: 'OtpRes';
  otp?: Maybe<Scalars['Float']['output']>;
  otpGeneratedSuccessfully: Scalars['Boolean']['output'];
};

export type Package = {
  __typename?: 'Package';
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offerId: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type PaginatedApplicationModules = {
  __typename?: 'PaginatedApplicationModules';
  data: Array<ApplicationModule>;
  meta: Meta;
};

export type PaginatedBreakdowns = {
  __typename?: 'PaginatedBreakdowns';
  data: Array<Breakdown>;
  meta: Meta;
};

export type PaginatedCoupons = {
  __typename?: 'PaginatedCoupons';
  data: Array<Coupon>;
  meta: Meta;
};

export type PaginatedMeeting = {
  __typename?: 'PaginatedMeeting';
  data: Array<Meeting>;
  meta: Meta;
};

export type PaginatedMeetingTask = {
  __typename?: 'PaginatedMeetingTask';
  data: Array<MeetingTask>;
  meta: Meta;
};

export type PaginatedMeetingType = {
  __typename?: 'PaginatedMeetingType';
  data: Array<MeetingType>;
  meta: Meta;
};

export type PaginatedMeetingVenue = {
  __typename?: 'PaginatedMeetingVenue';
  data: Array<MeetingVenue>;
  meta: Meta;
};

export type PaginatedOffers = {
  __typename?: 'PaginatedOffers';
  data: Array<Offer>;
  meta: Meta;
};

export type PaginatedOrganizations = {
  __typename?: 'PaginatedOrganizations';
  data: Array<Organization>;
  meta: Meta;
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  data: Array<Project>;
  meta: Meta;
};

export type PaginatedRoles = {
  __typename?: 'PaginatedRoles';
  data: Array<Role>;
  meta: Meta;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  meta: Meta;
};

export type PaginatedVehicles = {
  __typename?: 'PaginatedVehicles';
  data: Array<Vehicle>;
  meta: Meta;
};

export type PermissionGroup = {
  __typename?: 'PermissionGroup';
  modules: Array<Module>;
};

export type Permissions = {
  __typename?: 'Permissions';
  action: Scalars['String']['output'];
  appName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  module: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Plan = {
  __typename?: 'Plan';
  couponId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offerId: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type Project = {
  __typename?: 'Project';
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type ProjectStatusDto = {
  id: Scalars['Float']['input'];
  status: CustomStatus;
};

export type Query = {
  __typename?: 'Query';
  allPermissions: Array<Permissions>;
  dashboardCount: DashboardCount;
  findAllMeeting: Array<Meeting>;
  findAllMeetingTask: Array<MeetingTask>;
  findAllMeetingType: Array<MeetingType>;
  findAllMeetingVenue: Array<MeetingVenue>;
  findAllNotes: Array<Notes>;
  findBreakdownById: Breakdown;
  findCouponById: Coupon;
  findModuleById: ApplicationModule;
  findOfferById: Offer;
  findOrganizationById: Organization;
  findPermissionById: Permissions;
  findPermissionsByUser: Array<Scalars['String']['output']>;
  findRoleById: Role;
  findUserById: User;
  findVehicleById: Vehicle;
  getDashboard: Dashboard;
  getMeetingId: Meeting;
  getMeetingIdTask: MeetingTask;
  getMeetingType: MeetingType;
  getMeetingVenue: MeetingVenue;
  getNotesId: Notes;
  listTrashedOrganizations: PaginatedOrganizations;
  listTrashedProjects: PaginatedProjects;
  paginatedBreakdowns: PaginatedBreakdowns;
  paginatedCoupons: PaginatedCoupons;
  paginatedMeeting: PaginatedMeeting;
  paginatedMeetingTask: PaginatedMeetingTask;
  paginatedMeetingType: PaginatedMeetingType;
  paginatedMeetingVenue: PaginatedMeetingVenue;
  paginatedModules: PaginatedApplicationModules;
  paginatedOffers: PaginatedOffers;
  paginatedOrganization: PaginatedOrganizations;
  paginatedProjects: PaginatedProjects;
  paginatedRoles: PaginatedRoles;
  paginatedUsers: PaginatedUsers;
  paginatedVehicles: PaginatedVehicles;
  permissionGroup: PermissionGroup;
  post: Post;
  posts: Array<Post>;
  project: Project;
  trashedCoupons: PaginatedCoupons;
  trashedModules: PaginatedApplicationModules;
  trashedOffers: PaginatedOffers;
  trashedUsers: PaginatedUsers;
};


export type QueryDashboardCountArgs = {
  filters: ReportFilters;
};


export type QueryFindBreakdownByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindCouponByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindModuleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOfferByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOrganizationByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPermissionByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindPermissionsByUserArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindRoleByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindVehicleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetDashboardArgs = {
  filters: DashboardFilters;
};


export type QueryGetMeetingIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingIdTaskArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingTypeArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingVenueArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetNotesIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryListTrashedOrganizationsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedBreakdownsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedModulesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOrganizationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedUsersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehiclesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTrashedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedModulesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedUsersArgs = {
  ListInputDTO: ListInputDto;
};

export type RegisterDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  emailOTP: Scalars['Float']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ReportFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissionCount: Scalars['Float']['output'];
  permissions: Array<Permissions>;
  roleType?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offer: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type UpdateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  vehicleId: Scalars['Float']['input'];
};

export type UpdateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  createdByUserId?: InputMaybe<Scalars['Float']['input']>;
  endTime: Scalars['String']['input'];
  id: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTaskDto = {
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent: Scalars['Float']['input'];
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  meRefId: Scalars['String']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  ownerId?: InputMaybe<Scalars['Float']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
  task?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMeetingTypeDto = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type UpdateModuleDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  uploadDoc: Scalars['String']['input'];
};

export type UpdateOfferDto = {
  cashbackAmount: Scalars['Float']['input'];
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateOrganizationDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdatePermissionDto = {
  action?: InputMaybe<Scalars['String']['input']>;
  appName?: InputMaybe<AppName>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  module?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRoleDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  roleId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateVehicleDto = {
  chassisNumber?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  insurance?: InputMaybe<Scalars['String']['input']>;
  maintenanceHistory?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  numberPlate?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Float']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobileNo?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['Float']['output']>;
  posts: Array<Post>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username?: Maybe<Scalars['String']['output']>;
};

/** User Type Status */
export enum UserType {
  Admin = 'admin',
  AdminEmployee = 'adminEmployee',
  Organization = 'organization',
  OrganizationEmployee = 'organizationEmployee'
}

export type ValidateDto = {
  email: Scalars['String']['input'];
  otp: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  chassisNumber: Scalars['String']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  insurance: Scalars['String']['output'];
  maintenanceHistory?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  numberPlate: Scalars['String']['output'];
  status: Scalars['String']['output'];
  year: Scalars['String']['output'];
};

export type VehicleStatusDto = {
  id: Scalars['Float']['input'];
  status: Status;
};

export enum AppName {
  MasterApp = 'MasterApp',
  MaterialManagement = 'MaterialManagement',
  TaskManagement = 'TaskManagement',
  VehicleManagement = 'VehicleManagement'
}

export enum Status {
  Active = 'active',
  Breakdown = 'breakdown',
  Inactive = 'inactive',
  Maintenance = 'maintenance'
}

export type RequestOtpMutationVariables = Exact<{
  otpRequestData: OtpRequestDto;
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'OtpRes', otpGeneratedSuccessfully: boolean, otp?: number | null } };

export type LoginMutationVariables = Exact<{
  loginData: ValidateDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', accessToken: string, user: { __typename?: 'User', id: string } } };

export type DeleteOrganizationMutationVariables = Exact<{
  deleteOrganizationId: Scalars['Int']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: boolean };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null } };

export type CreateMeetingMutationVariables = Exact<{
  data: CreateMeetingDto;
}>;


export type CreateMeetingMutation = { __typename?: 'Mutation', createMeeting: { __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId?: number | null, meetingVenueId?: number | null, meetingTypeId?: number | null, title?: string | null, organizationId?: number | null, parentMeetingId?: number | null, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: Array<string> | null, uploadDoc?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationDto;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type PaginatedOrganizationQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOrganizationQuery = { __typename?: 'Query', paginatedOrganization: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type ModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type ModulesQuery = { __typename?: 'Query', permissionGroup: { __typename?: 'PermissionGroup', modules: Array<{ __typename?: 'Module', name: string, groups: Array<{ __typename?: 'Group', name: string, permissions: Array<{ __typename?: 'Permissions', action: string, appName: string, description: string, groupName: string, id: string, module: string, slug: string }> }> }> } };

export type PaginatedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', data: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number }> } };


export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpRequestDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpRequestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpGeneratedSuccessfully"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationId"}}}]}]}}]} as unknown as DocumentNode<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CreateMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const PaginatedOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOrganizationQuery, PaginatedOrganizationQueryVariables>;
export const ModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ModulesQuery, ModulesQueryVariables>;
export const PaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedProjectsQuery, PaginatedProjectsQueryVariables>;