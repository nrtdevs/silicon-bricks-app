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

export type AppPermissionsDto = {
  __typename?: 'AppPermissionsDto';
  appName: Scalars['String']['output'];
  modules: Array<PermissionGroupDto>;
};

export type ApplicationModule = {
  __typename?: 'ApplicationModule';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type ApplicationModuleArray = {
  __typename?: 'ApplicationModuleArray';
  data: Array<ApplicationModule>;
};

export type ApplicationModuleUnion = ApplicationModule | ApplicationModuleArray;

export type ChangePasswordDto = {
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type Coupon = {
  __typename?: 'Coupon';
  couponCode: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType?: Maybe<Scalars['String']['output']>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount?: Maybe<Scalars['Float']['output']>;
  minOrderAmount?: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

export type CouponArray = {
  __typename?: 'CouponArray';
  data: Array<Coupon>;
};

export type CouponOrCoupons = Coupon | CouponArray;

/** Coupon Status */
export enum CouponStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive',
  Used = 'used'
}

export type CouponStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CouponStatus;
};

export type CreateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateFollowUpDto = {
  body: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type CreateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  endTime: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTaskDto = {
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent: Scalars['Float']['input'];
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  ownerId?: InputMaybe<Scalars['Float']['input']>;
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  totalPercent?: InputMaybe<Scalars['Int']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTypeDto = {
  name: Scalars['String']['input'];
};

export type CreateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateModuleDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateNotePadDto = {
  notesField: Scalars['String']['input'];
};

export type CreateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOfferDto = {
  cashbackAmount?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  discountType?: InputMaybe<Scalars['String']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  maxDiscountAmount?: InputMaybe<Scalars['Float']['input']>;
  minOrderAmount?: InputMaybe<Scalars['Float']['input']>;
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateOrganizationDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePackageDto = {
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerDescription?: InputMaybe<Scalars['String']['input']>;
  offerExpiryDate?: InputMaybe<Scalars['String']['input']>;
  offerType?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
};

export type CreatePermissionDto = {
  action: Scalars['String']['input'];
  appName: AppName;
  description: Scalars['String']['input'];
  module: Scalars['String']['input'];
};

export type CreatePlanDto = {
  couponId?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  packageId: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
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

export type CreateSubscriptionDto = {
  couponId?: InputMaybe<Scalars['Float']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Designation>;
  email: Scalars['String']['input'];
  mobileNo: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Float']['input']>;
  roleIds: Array<Scalars['Int']['input']>;
  userType?: InputMaybe<UserType>;
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
  completedMeeting?: Maybe<Scalars['Int']['output']>;
  completedTasks?: Maybe<Scalars['Int']['output']>;
  inComingTasks?: Maybe<Scalars['Int']['output']>;
  inactiveMeetings?: Maybe<Scalars['Int']['output']>;
  ongoingTasks?: Maybe<Scalars['Int']['output']>;
  todayMeeting?: Maybe<Scalars['Int']['output']>;
  totalMeetings?: Maybe<Scalars['Int']['output']>;
  totalTasks?: Maybe<Scalars['Int']['output']>;
  upComingMeeting?: Maybe<Scalars['Int']['output']>;
};

export type DashboardCount = {
  __typename?: 'DashboardCount';
  assignedPermissionCount?: Maybe<Scalars['Int']['output']>;
  couponCount?: Maybe<Scalars['Int']['output']>;
  moduleCount?: Maybe<Scalars['Int']['output']>;
  offerCount?: Maybe<Scalars['Int']['output']>;
  organizationCount?: Maybe<Scalars['Int']['output']>;
  packageCount?: Maybe<Scalars['Int']['output']>;
  packageModuleCount?: Maybe<Scalars['Int']['output']>;
  permissionCount?: Maybe<Scalars['Int']['output']>;
  planCount?: Maybe<Scalars['Int']['output']>;
  projectCount?: Maybe<Scalars['Int']['output']>;
  roleCount?: Maybe<Scalars['Int']['output']>;
  subscriptionCount?: Maybe<Scalars['Int']['output']>;
  subscriptionPlanCount?: Maybe<Scalars['Int']['output']>;
  userCount?: Maybe<Scalars['Int']['output']>;
};

export type DashboardFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  month?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

/** User Designation Hierarchy */
export enum Designation {
  Ceo = 'CEO',
  Cto = 'CTO',
  Employee = 'EMPLOYEE',
  Hr = 'HR',
  Manager = 'MANAGER',
  TeamLead = 'TEAM_LEAD'
}

/** Discount type for coupon */
export enum DiscountType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type DynamicPermissionsDto = {
  __typename?: 'DynamicPermissionsDto';
  apps: Array<AppPermissionsDto>;
};

export type FollowUp = {
  __typename?: 'FollowUp';
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

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
  children?: Maybe<Array<Meeting>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
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
  parentMeeting?: Maybe<Meeting>;
  parentMeetingId?: Maybe<Scalars['Float']['output']>;
  projectId?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  task?: Maybe<Array<MeetingTask>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type MeetingArray = {
  __typename?: 'MeetingArray';
  data: Array<Meeting>;
};

export type MeetingFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MeetingOrMeetings = Meeting | MeetingArray;

/** Meeting  Status */
export enum MeetingStatus {
  Active = 'active',
  Completed = 'completed',
  Inactive = 'inactive'
}

export type MeetingStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: MeetingStatus;
};

export type MeetingTask = {
  __typename?: 'MeetingTask';
  assigneeId?: Maybe<Scalars['Float']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  completePercent?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  meetingId?: Maybe<Scalars['Float']['output']>;
  meetingTask?: Maybe<Meeting>;
  notesId?: Maybe<Scalars['Float']['output']>;
  notesTask?: Maybe<Notes>;
  openedDate?: Maybe<Scalars['DateTime']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  parentTask?: Maybe<MeetingTask>;
  priority: Scalars['String']['output'];
  projectId?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  subtasks?: Maybe<Array<MeetingTask>>;
  task?: Maybe<Scalars['String']['output']>;
  weightType?: Maybe<Scalars['String']['output']>;
};

export type MeetingTaskArray = {
  __typename?: 'MeetingTaskArray';
  data: Array<MeetingTask>;
};

export type MeetingTaskFiltersDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MeetingTaskOrMeetingTasks = MeetingTask | MeetingTaskArray;

/** Meeting Task Status */
export enum MeetingTaskStatus {
  Approved = 'approved',
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Rejected = 'rejected'
}

export type MeetingTaskStatusDto = {
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  ids: Array<Scalars['Float']['input']>;
  status: MeetingTaskStatus;
};

export type MeetingType = {
  __typename?: 'MeetingType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
  title?: Maybe<Scalars['String']['output']>;
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
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignModuleToPkg: Package;
  assignPermissionsToRole: Role;
  assignPlanToSubscription: Subscriptions;
  assignRoleToUser: User;
  changeCouponStatus: CouponOrCoupons;
  changeModuleStatus: ApplicationModuleUnion;
  changeOfferStatus: OfferUnion;
  changePackageStatus: PackageUnion;
  changePassword: Scalars['Boolean']['output'];
  changePlanStatus: PlanOrPlans;
  changeRoleStatus: RoleUnion;
  changeSubscriptionStatus: SubscriptionsUnion;
  changeUserStatus: UserUnion;
  createCoupon: Coupon;
  createFollowUp: FollowUp;
  createMeeting: Meeting;
  createMeetingTask: MeetingTask;
  createMeetingType: MeetingType;
  createMeetingVenue: MeetingVenue;
  createModule: ApplicationModule;
  createNotePad: NotePad;
  createNotes: Array<Notes>;
  createOffer: Offer;
  createOrganization: Organization;
  createPackage: Package;
  createPermission: Permissions;
  createPlan: Plan;
  createProject: Project;
  createRole: Role;
  createSubTask: MeetingTask;
  createSubscription: Subscriptions;
  createSubscriptionWithPlans: Subscriptions;
  createUser: User;
  deleteCoupon: Scalars['Boolean']['output'];
  deleteFollowUp: Scalars['Boolean']['output'];
  deleteMeting: Scalars['Boolean']['output'];
  deleteMetingTask: Scalars['Boolean']['output'];
  deleteMetingType: Scalars['Boolean']['output'];
  deleteMetingVenue: Scalars['Boolean']['output'];
  deleteModule: Scalars['Boolean']['output'];
  deleteNotePad: Scalars['Boolean']['output'];
  deleteNotes: Scalars['Boolean']['output'];
  deleteOffer: Scalars['Boolean']['output'];
  deleteOrganization: Scalars['Boolean']['output'];
  deletePackage: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  deletePlan: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteSubscription: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  enableMeetingStatus: MeetingOrMeetings;
  enableMeetingTaskStatus: MeetingTaskOrMeetingTasks;
  enableNotePad: NotePadOrNotePads;
  enableOrganizationStatus: OrganizationUnion;
  enableProjectStatus: ProjectUnion;
  forgotPassword: Scalars['Boolean']['output'];
  hardDeleteCoupon: Scalars['Boolean']['output'];
  hardDeleteFollowUp: Scalars['Boolean']['output'];
  hardDeleteMeeting: Scalars['Boolean']['output'];
  hardDeleteMeetingTask: Scalars['Boolean']['output'];
  hardDeleteMeetingType: Scalars['Boolean']['output'];
  hardDeleteMeetingVenue: Scalars['Boolean']['output'];
  hardDeleteModule: Scalars['Boolean']['output'];
  hardDeleteNotePad: Scalars['Boolean']['output'];
  hardDeleteNotes: Scalars['Boolean']['output'];
  hardDeleteOffer: Scalars['Boolean']['output'];
  hardDeleteOrganization: Scalars['Boolean']['output'];
  hardDeletePackage: Scalars['Boolean']['output'];
  hardDeletePlan: Scalars['Boolean']['output'];
  hardDeleteProject: Scalars['Boolean']['output'];
  hardDeleteRole: Scalars['Boolean']['output'];
  hardDeleteSubscription: Scalars['Boolean']['output'];
  hardDeleteUser: Scalars['Boolean']['output'];
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  register: User;
  requestOtp: OtpRes;
  resetPassword: Scalars['Boolean']['output'];
  restoreCoupon: Scalars['Boolean']['output'];
  restoreMeeting: Scalars['Boolean']['output'];
  restoreMeetingTask: Scalars['Boolean']['output'];
  restoreMeetingType: Scalars['Boolean']['output'];
  restoreMeetingVenue: Scalars['Boolean']['output'];
  restoreModule: Scalars['Boolean']['output'];
  restoreNotePad: Scalars['Boolean']['output'];
  restoreNotes: Scalars['Boolean']['output'];
  restoreOffer: Scalars['Boolean']['output'];
  restoreOrganization: Scalars['Boolean']['output'];
  restorePackage: Scalars['Boolean']['output'];
  restorePlan: Scalars['Boolean']['output'];
  restoreProject: Scalars['Boolean']['output'];
  restoreRole: Scalars['Boolean']['output'];
  restoreSubscription: Scalars['Boolean']['output'];
  restoreUser: Scalars['Boolean']['output'];
  sendRegistrationOtp: OtpRes;
  updateCoupon: Coupon;
  updateFollowUp: FollowUp;
  updateMeeting: Meeting;
  updateMeetingTask: MeetingTask;
  updateMeetingType: MeetingType;
  updateMeetingVenue: MeetingVenue;
  updateModule: ApplicationModule;
  updateNotePad: NotePad;
  updateNotes: Notes;
  updateOffer: Offer;
  updateOrganization: Organization;
  updatePackage: Package;
  updatePermission: Permissions;
  updatePlan: Plan;
  updateProfile: User;
  updateProject: Project;
  updateRole: Role;
  updateSubscription: Subscriptions;
  updateUser: User;
};


export type MutationAssignModuleToPkgArgs = {
  moduleIds: Array<Scalars['Int']['input']>;
  packageId: Scalars['Int']['input'];
};


export type MutationAssignPermissionsToRoleArgs = {
  permissionIds: Array<Scalars['Int']['input']>;
  roleId: Scalars['Int']['input'];
};


export type MutationAssignPlanToSubscriptionArgs = {
  SubscriptionId: Scalars['Int']['input'];
  planIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignRoleToUserArgs = {
  roleIds: Array<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
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


export type MutationChangePackageStatusArgs = {
  updatePackageStatusInput: PackageStatusDto;
};


export type MutationChangePasswordArgs = {
  changePasswordData: ChangePasswordDto;
};


export type MutationChangePlanStatusArgs = {
  updatePlanStatusInput: PlanStatusDto;
};


export type MutationChangeRoleStatusArgs = {
  data: RoleStatusDto;
};


export type MutationChangeSubscriptionStatusArgs = {
  updateSubscriptionStatusInput: SubscriptionStatusDto;
};


export type MutationChangeUserStatusArgs = {
  data: UserStatusDto;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponDto;
};


export type MutationCreateFollowUpArgs = {
  data: CreateFollowUpDto;
};


export type MutationCreateMeetingArgs = {
  data: CreateMeetingDto;
};


export type MutationCreateMeetingTaskArgs = {
  input: CreateMeetingTaskDto;
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


export type MutationCreateNotePadArgs = {
  notesData: CreateNotePadDto;
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


export type MutationCreatePackageArgs = {
  createPackageInput: CreatePackageDto;
};


export type MutationCreatePermissionArgs = {
  data: CreatePermissionDto;
};


export type MutationCreatePlanArgs = {
  createPlanInput: CreatePlanDto;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectDto;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleDto;
};


export type MutationCreateSubTaskArgs = {
  input: CreateMeetingTaskDto;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionDto;
};


export type MutationCreateSubscriptionWithPlansArgs = {
  createSubscriptionInput: CreateSubscriptionDto;
  planIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationDeleteCouponArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteFollowUpArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteMetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeletePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteUserArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationEnableMeetingStatusArgs = {
  updateMeetingStatusInput: MeetingStatusDto;
};


export type MutationEnableMeetingTaskStatusArgs = {
  updateMeetingTaskStatusInput: MeetingTaskStatusDto;
};


export type MutationEnableNotePadArgs = {
  updateMeetingStatusInput: NotePadStatusDto;
};


export type MutationEnableOrganizationStatusArgs = {
  data: OrganizationStatusDto;
};


export type MutationEnableProjectStatusArgs = {
  data: ProjectStatusDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationHardDeleteCouponArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteFollowUpArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteMeetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeletePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeletePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationHardDeleteUserArgs = {
  ids: Array<Scalars['Int']['input']>;
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
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingTaskArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingTypeArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreMeetingVenueArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreModuleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreNotePadArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreNotesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreOfferArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreOrganizationArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestorePackageArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestorePlanArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreProjectArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreRoleArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreSubscriptionArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationRestoreUserArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationSendRegistrationOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponDto;
};


export type MutationUpdateFollowUpArgs = {
  updateFollowUpInput: UpdateFollowUpDto;
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


export type MutationUpdateNotePadArgs = {
  updateNotesInput: UpdateNotePadDto;
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


export type MutationUpdatePackageArgs = {
  updatePackageInput: UpdatePackageDto;
};


export type MutationUpdatePermissionArgs = {
  data: UpdatePermissionDto;
};


export type MutationUpdatePlanArgs = {
  updatePlanInput: UpdatePlanDto;
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


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionDto;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserDto;
};

export type NotePad = {
  __typename?: 'NotePad';
  UserId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdUser: User;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  notesField?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NotePadArray = {
  __typename?: 'NotePadArray';
  data: Array<NotePad>;
};

export type NotePadOrNotePads = NotePad | NotePadArray;

/** NotePad Status */
export enum NotePadStatus {
  Completed = 'completed',
  Pending = 'pending'
}

export type NotePadStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: NotePadStatus;
};

export type Notes = {
  __typename?: 'Notes';
  createdAt: Scalars['DateTime']['output'];
  decision?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Array<MeetingTask>>;
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  cashbackAmount?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountType?: Maybe<Scalars['String']['output']>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDiscountAmount?: Maybe<Scalars['Float']['output']>;
  minOrderAmount?: Maybe<Scalars['Float']['output']>;
  offerType?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  usageLimit: Scalars['Float']['output'];
};

export type OfferArray = {
  __typename?: 'OfferArray';
  data: Array<Offer>;
};

/** OFFER STATUS */
export enum OfferStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type OfferStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: OfferStatus;
};

/** Offer Status */
export enum OfferTypeStatus {
  Cashback = 'CASHBACK',
  Discount = 'DISCOUNT'
}

export type OfferUnion = Offer | OfferArray;

export type Organization = {
  __typename?: 'Organization';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type OrganizationArray = {
  __typename?: 'OrganizationArray';
  data: Array<Organization>;
};

export type OrganizationStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type OrganizationUnion = Organization | OrganizationArray;

export type OtpRequestDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type OtpRes = {
  __typename?: 'OtpRes';
  message?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['Float']['output']>;
  otpGeneratedSuccessfully: Scalars['Boolean']['output'];
};

export type Package = {
  __typename?: 'Package';
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  modules: Array<ApplicationModule>;
  name: Scalars['String']['output'];
  offerDescription?: Maybe<Scalars['String']['output']>;
  offerExpiryDate?: Maybe<Scalars['DateTime']['output']>;
  offerType?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type PackageArray = {
  __typename?: 'PackageArray';
  data: Array<Package>;
};

/** Package Status */
export enum PackageStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PackageStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: PackageStatus;
};

export type PackageUnion = Package | PackageArray;

export type PaginatedApplicationModules = {
  __typename?: 'PaginatedApplicationModules';
  data: Array<ApplicationModule>;
  meta: Meta;
};

export type PaginatedCoupons = {
  __typename?: 'PaginatedCoupons';
  data: Array<Coupon>;
  meta: Meta;
};

export type PaginatedFollowUp = {
  __typename?: 'PaginatedFollowUp';
  data: Array<FollowUp>;
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

export type PaginatedNotePad = {
  __typename?: 'PaginatedNotePad';
  data: Array<NotePad>;
  meta: Meta;
};

export type PaginatedNotes = {
  __typename?: 'PaginatedNotes';
  data: Array<Notes>;
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

export type PaginatedPackages = {
  __typename?: 'PaginatedPackages';
  data: Array<Package>;
  meta: Meta;
};

export type PaginatedPermissions = {
  __typename?: 'PaginatedPermissions';
  data: Array<Permissions>;
  meta: Meta;
};

export type PaginatedPlans = {
  __typename?: 'PaginatedPlans';
  data: Array<Plan>;
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

export type PaginatedSubscriptions = {
  __typename?: 'PaginatedSubscriptions';
  data: Array<Subscriptions>;
  meta: Meta;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  meta: Meta;
};

export type PermissionDto = {
  __typename?: 'PermissionDto';
  action: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  module: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type PermissionGroup = {
  __typename?: 'PermissionGroup';
  modules: Array<Module>;
};

export type PermissionGroupDto = {
  __typename?: 'PermissionGroupDto';
  name: Scalars['String']['output'];
  permissions: Array<PermissionDto>;
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
  couponId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Float']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  package: Package;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type PlanArray = {
  __typename?: 'PlanArray';
  data: Array<Plan>;
};

export type PlanOrPlans = Plan | PlanArray;

/** Plan Status */
export enum PlanStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type PlanStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: PlanStatus;
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

export type ProjectArray = {
  __typename?: 'ProjectArray';
  data: Array<Project>;
};

export type ProjectStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type ProjectUnion = Project | ProjectArray;

export type Query = {
  __typename?: 'Query';
  MeetingCalender: Array<Meeting>;
  MeetingTaskCalender: Array<MeetingTask>;
  allPermissions: DynamicPermissionsDto;
  couponsDropdown: PaginatedCoupons;
  dashboardCount: DashboardCount;
  dropDownMeeting: PaginatedMeeting;
  dropDownMeetingTask: PaginatedMeetingTask;
  dropDownMeetingType: PaginatedMeetingType;
  dropDownMeetingVenue: PaginatedMeetingVenue;
  dropDownNotes: PaginatedNotes;
  dropdownOffers: PaginatedOffers;
  findCouponById: Coupon;
  findModuleById: ApplicationModule;
  findOfferById: Offer;
  findOrganizationById: Organization;
  findPackageById: Package;
  findPermissionById: Permissions;
  findPermissionsByUser: Array<Scalars['String']['output']>;
  findPlanById: Plan;
  findRoleById: Role;
  findSubscriptionById: Subscriptions;
  findUserById: User;
  getAllMeetingTypes: Array<MeetingType>;
  getAllNotePad: Array<NotePad>;
  getFollowUpById: FollowUp;
  getMeetingDashboard: Dashboard;
  getMeetingId: Meeting;
  getMeetingIdTask: MeetingTask;
  getMeetingType: MeetingType;
  getMeetingVenue: MeetingVenue;
  getNotePadById: NotePad;
  getNotesId: Notes;
  getPaginatedNotesByMeetingId: PaginatedNotes;
  getUpcomingMeetingTask: PaginatedMeetingTask;
  getUpcomingMeetings: PaginatedMeeting;
  listTrashedFollowUp: PaginatedFollowUp;
  listTrashedMeeting: PaginatedMeeting;
  listTrashedMeetingTask: PaginatedMeetingTask;
  listTrashedMeetingType: PaginatedMeetingType;
  listTrashedMeetingVenue: PaginatedMeetingVenue;
  listTrashedNotePad: PaginatedNotePad;
  listTrashedNotes: PaginatedNotes;
  listTrashedOrganizations: PaginatedOrganizations;
  listTrashedProjects: PaginatedProjects;
  listTrashedRoles: PaginatedRoles;
  meetingHierarchy: Meeting;
  packagesDropdown: PaginatedPackages;
  paginatedCoupons: PaginatedCoupons;
  paginatedFollowUp: PaginatedFollowUp;
  paginatedMeeting: PaginatedMeeting;
  paginatedMeetingTask: PaginatedMeetingTask;
  paginatedMeetingType: PaginatedMeetingType;
  paginatedMeetingVenue: PaginatedMeetingVenue;
  paginatedModules: PaginatedApplicationModules;
  paginatedNotePad: PaginatedNotePad;
  paginatedNotes: PaginatedNotes;
  paginatedOffers: PaginatedOffers;
  paginatedOrganization: PaginatedOrganizations;
  paginatedPackages: PaginatedPackages;
  paginatedPermissions: PaginatedPermissions;
  paginatedPlans: PaginatedPlans;
  paginatedProjects: PaginatedProjects;
  paginatedRoles: PaginatedRoles;
  paginatedSubscriptions: PaginatedSubscriptions;
  paginatedUsers: PaginatedUsers;
  permissionGroup: PermissionGroup;
  project: Project;
  trashedCoupons: PaginatedCoupons;
  trashedModules: PaginatedApplicationModules;
  trashedOffers: PaginatedOffers;
  trashedPackages: PaginatedPackages;
  trashedPlans: PaginatedPlans;
  trashedSubscriptions: PaginatedSubscriptions;
  trashedUsers: PaginatedUsers;
  userHierarchy: Array<User>;
};


export type QueryMeetingCalenderArgs = {
  filters?: InputMaybe<MeetingFiltersDto>;
};


export type QueryMeetingTaskCalenderArgs = {
  filters?: InputMaybe<MeetingTaskFiltersDto>;
};


export type QueryCouponsDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDashboardCountArgs = {
  filters: ReportFilters;
};


export type QueryDropDownMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropDownNotesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDropdownOffersArgs = {
  ListInputDTO: ListInputDto;
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


export type QueryFindPackageByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPermissionByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindPermissionsByUserArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindPlanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindRoleByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindSubscriptionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetFollowUpByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetMeetingDashboardArgs = {
  filters?: InputMaybe<DashboardFilters>;
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


export type QueryGetNotePadByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetNotesIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetPaginatedNotesByMeetingIdArgs = {
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
};


export type QueryGetUpcomingMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetUpcomingMeetingsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedFollowUpArgs = {
  ListInputDto: ListInputDto;
};


export type QueryListTrashedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingTaskArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingTypeArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedMeetingVenueArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedNotePadArgs = {
  ListInputDto: ListInputDto;
};


export type QueryListTrashedNotesArgs = {
  ListInputDto: ListInputDto;
};


export type QueryListTrashedOrganizationsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryListTrashedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryMeetingHierarchyArgs = {
  meetingId: Scalars['Int']['input'];
};


export type QueryPackagesDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedFollowUpArgs = {
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


export type QueryPaginatedNotePadArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedNotesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOffersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedOrganizationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPackagesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPermissionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedPlansArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedProjectsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedSubscriptionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedUsersArgs = {
  ListInputDTO: ListInputDto;
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


export type QueryTrashedPackagesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedPlansArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedSubscriptionsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryTrashedUsersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryUserHierarchyArgs = {
  parentId?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  emailOTP: Scalars['Float']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
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
  organization?: Maybe<Organization>;
  permissionCount: Scalars['Float']['output'];
  permissions: Array<Permissions>;
  roleType?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type RoleArray = {
  __typename?: 'RoleArray';
  data: Array<Role>;
};

export type RoleStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

export type RoleUnion = Role | RoleArray;

/** Subscription Status */
export enum SubscriptionStatus {
  Active = 'active',
  Expired = 'expired',
  Inactive = 'inactive'
}

export type SubscriptionStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: SubscriptionStatus;
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  couponId?: Maybe<Scalars['ID']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plans: Array<Plan>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type SubscriptionsArray = {
  __typename?: 'SubscriptionsArray';
  data: Array<Subscriptions>;
};

export type SubscriptionsUnion = Subscriptions | SubscriptionsArray;

export type UpdateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount: Scalars['Float']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateFollowUpDto = {
  body?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingDto = {
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingReference?: InputMaybe<Scalars['String']['input']>;
  meetingTypeId?: InputMaybe<Scalars['Float']['input']>;
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTaskDto = {
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate?: InputMaybe<Scalars['DateTime']['input']>;
  ownerId?: InputMaybe<Scalars['Float']['input']>;
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  totalPercent?: InputMaybe<Scalars['Int']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingTypeDto = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateModuleDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateNotePadDto = {
  id: Scalars['Float']['input'];
  notesField?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotesDto = {
  decision?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferDto = {
  cashbackAmount?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  discountType?: InputMaybe<Scalars['String']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  maxDiscountAmount?: InputMaybe<Scalars['Float']['input']>;
  minOrderAmount?: InputMaybe<Scalars['Float']['input']>;
  offerType: OfferTypeStatus;
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type UpdateOrganizationDto = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdatePackageDto = {
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  moduleIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  offerDescription?: InputMaybe<Scalars['String']['input']>;
  offerExpiryDate?: InputMaybe<Scalars['String']['input']>;
  offerType?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
};

export type UpdatePermissionDto = {
  action?: InputMaybe<Scalars['String']['input']>;
  appName?: InputMaybe<AppName>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  module?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlanDto = {
  couponId?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  packageId: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
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

export type UpdateSubscriptionDto = {
  couponId?: InputMaybe<Scalars['Float']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Designation>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  mobileNo?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Float']['input']>;
  roleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userType?: InputMaybe<UserType>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  designation?: Maybe<Designation>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobileNo?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['Float']['output']>;
  parent?: Maybe<User>;
  parentId?: Maybe<Scalars['Float']['output']>;
  roles?: Maybe<Array<Role>>;
  status: Scalars['String']['output'];
  subordinates?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserArray = {
  __typename?: 'UserArray';
  data: Array<User>;
};

export type UserStatusDto = {
  ids: Array<Scalars['Float']['input']>;
  status: CustomStatus;
};

/** User Type Status */
export enum UserType {
  Admin = 'admin',
  AdminEmployee = 'adminEmployee',
  Organization = 'organization',
  OrganizationEmployee = 'organizationEmployee',
  ThirdParty = 'thirdParty',
  ThirdPartyEmployee = 'thirdPartyEmployee'
}

export type UserUnion = User | UserArray;

export type ValidateDto = {
  email: Scalars['String']['input'];
  otp: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};

export enum AppName {
  MasterApp = 'MasterApp',
  MaterialManagement = 'MaterialManagement',
  TaskManagement = 'TaskManagement',
  VehicleManagement = 'VehicleManagement'
}

export type RequestOtpMutationVariables = Exact<{
  otpRequestData: OtpRequestDto;
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'OtpRes', otpGeneratedSuccessfully: boolean, otp?: number | null, message?: string | null } };

export type LoginMutationVariables = Exact<{
  loginData: ValidateDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', accessToken: string, user: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType } } };

export type DeleteOrganizationMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: boolean };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null } };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationDto;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type EnableOrganizationStatusMutationVariables = Exact<{
  data: OrganizationStatusDto;
}>;


export type EnableOrganizationStatusMutation = { __typename?: 'Mutation', enableOrganizationStatus: { __typename?: 'Organization', id: string, status: string } | { __typename?: 'OrganizationArray', data: Array<{ __typename?: 'Organization', id: string, status: string }> } };

export type UpdateOrganizationMutationVariables = Exact<{
  updateOrganizationInput: UpdateOrganizationDto;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: string, permissionCount: number, roleType?: string | null, name: string, status: string, permissions: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }> }> | null } };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type CreateModuleMutationVariables = Exact<{
  createModuleInput: CreateModuleDto;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type UpdateModuleMutationVariables = Exact<{
  updateModuleInput: UpdateModuleDto;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type ChangeModuleStatusMutationVariables = Exact<{
  updateModuleStatusInput: ModuleStatusDto;
}>;


export type ChangeModuleStatusMutation = { __typename?: 'Mutation', changeModuleStatus: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } | { __typename?: 'ApplicationModuleArray', data: Array<{ __typename?: 'ApplicationModule', id: string, status: string }> } };

export type DeleteModuleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteModuleMutation = { __typename?: 'Mutation', deleteModule: boolean };

export type CreateCouponMutationVariables = Exact<{
  createCouponInput: CreateCouponDto;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createCoupon: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType?: string | null, maxDiscountAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string }> | null } };

export type DeleteUserMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ChangeUserStatusMutationVariables = Exact<{
  data: UserStatusDto;
}>;


export type ChangeUserStatusMutation = { __typename?: 'Mutation', changeUserStatus: { __typename?: 'User', id: string, status: string } | { __typename?: 'UserArray', data: Array<{ __typename?: 'User', id: string, status: string }> } };

export type UpdateCouponMutationVariables = Exact<{
  updateCouponInput: UpdateCouponDto;
}>;


export type UpdateCouponMutation = { __typename?: 'Mutation', updateCoupon: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType?: string | null, maxDiscountAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type ChangeCouponStatusMutationVariables = Exact<{
  updateCouponStatusInput: CouponStatusDto;
}>;


export type ChangeCouponStatusMutation = { __typename?: 'Mutation', changeCouponStatus: { __typename?: 'Coupon', id: string, status: string } | { __typename?: 'CouponArray', data: Array<{ __typename?: 'Coupon', id: string, status: string }> } };

export type DeleteCouponMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCouponMutation = { __typename?: 'Mutation', deleteCoupon: boolean };

export type PaginatedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPackagesQuery = { __typename?: 'Query', paginatedPackages: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }> }> } };

export type CreatePackageMutationVariables = Exact<{
  createPackageInput: CreatePackageDto;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', createPackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string } };

export type UpdatePackageMutationVariables = Exact<{
  updatePackageInput: UpdatePackageDto;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string } };

export type DeletePackageMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePackageMutation = { __typename?: 'Mutation', deletePackage: boolean };

export type DeleteProjectMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type EnableProjectStatusMutationVariables = Exact<{
  data: ProjectStatusDto;
}>;


export type EnableProjectStatusMutation = { __typename?: 'Mutation', enableProjectStatus: { __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number } | { __typename?: 'ProjectArray', data: Array<{ __typename?: 'Project', id: string, status: string }> } };

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectDto;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number } };

export type UpdateProjectMutationVariables = Exact<{
  updateProjectInput: UpdateProjectDto;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number } };

export type CreateOfferMutationVariables = Exact<{
  createOfferInput: CreateOfferDto;
}>;


export type CreateOfferMutation = { __typename?: 'Mutation', createOffer: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountType?: string | null, discountValue?: number | null, maxDiscountAmount?: number | null, cashbackAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type UpdateOfferMutationVariables = Exact<{
  updateOfferInput: UpdateOfferDto;
}>;


export type UpdateOfferMutation = { __typename?: 'Mutation', updateOffer: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountType?: string | null, discountValue?: number | null, maxDiscountAmount?: number | null, cashbackAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type ChangeOfferStatusMutationVariables = Exact<{
  updateOfferStatusInput: OfferStatusDto;
}>;


export type ChangeOfferStatusMutation = { __typename?: 'Mutation', changeOfferStatus: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountType?: string | null, discountValue?: number | null, maxDiscountAmount?: number | null, cashbackAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } | { __typename?: 'OfferArray', data: Array<{ __typename?: 'Offer', id: string, status: string }> } };

export type DeleteOfferMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer: boolean };

export type CreatePlanMutationVariables = Exact<{
  createPlanInput: CreatePlanDto;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponId?: string | null, package: { __typename?: 'Package', id: string, name: string } } };

export type UpdatePlanMutationVariables = Exact<{
  updatePlanInput: UpdatePlanDto;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponId?: string | null } };

export type ChangePlanStatusMutationVariables = Exact<{
  updatePlanStatusInput: PlanStatusDto;
}>;


export type ChangePlanStatusMutation = { __typename?: 'Mutation', changePlanStatus: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponId?: string | null } | { __typename?: 'PlanArray', data: Array<{ __typename?: 'Plan', id: string, status: string }> } };

export type DeletePlanMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: boolean };

export type DeletePermissionMutationVariables = Exact<{
  deletePermissionId: Scalars['Float']['input'];
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deletePermission: boolean };

export type CreatePermissionMutationVariables = Exact<{
  data: CreatePermissionDto;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', createPermission: { __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string } };

export type CreateRoleMutationVariables = Exact<{
  data: CreateRoleDto;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string, permissionCount: number, permissions: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }>, organization?: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } | null } };

export type ModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type ModulesQuery = { __typename?: 'Query', permissionGroup: { __typename?: 'PermissionGroup', modules: Array<{ __typename?: 'Module', name: string, groups: Array<{ __typename?: 'Group', name: string, permissions: Array<{ __typename?: 'Permissions', action: string, appName: string, description: string, groupName: string, id: string, module: string, slug: string }> }> }> } };

export type PaginatedOrganizationQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOrganizationQuery = { __typename?: 'Query', paginatedOrganization: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type PaginatedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', paginatedUsers: { __typename?: 'PaginatedUsers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'User', avatar?: string | null, email: string, deletedAt?: any | null, createdAt: any, id: string, mobileNo?: number | null, name: string, organizationId?: number | null, parentId?: number | null, status: string, userType: UserType, username?: string | null, updatedAt: any, roles?: Array<{ __typename?: 'Role', id: string, name: string, roleType?: string | null }> | null }> } };

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['Float']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null } };

export type PaginatedModulesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedModulesQuery = { __typename?: 'Query', paginatedModules: { __typename?: 'PaginatedApplicationModules', data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedCouponsQuery = { __typename?: 'Query', paginatedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, discountType?: string | null, maxDiscountAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedSubscriptionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedSubscriptionsQuery = { __typename?: 'Query', paginatedSubscriptions: { __typename?: 'PaginatedSubscriptions', data: Array<{ __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string, plans: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponId?: string | null }> }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOffersQuery = { __typename?: 'Query', paginatedOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountType?: string | null, discountValue?: number | null, maxDiscountAmount?: number | null, cashbackAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type DropdownOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownOffersQuery = { __typename?: 'Query', dropdownOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountType?: string | null, discountValue?: number | null, maxDiscountAmount?: number | null, cashbackAmount?: number | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type DashboardCountQueryVariables = Exact<{
  filters: ReportFilters;
}>;


export type DashboardCountQuery = { __typename?: 'Query', dashboardCount: { __typename?: 'DashboardCount', userCount?: number | null, roleCount?: number | null, permissionCount?: number | null, assignedPermissionCount?: number | null, projectCount?: number | null, organizationCount?: number | null, couponCount?: number | null, offerCount?: number | null, moduleCount?: number | null, packageCount?: number | null, planCount?: number | null, subscriptionCount?: number | null, packageModuleCount?: number | null, subscriptionPlanCount?: number | null } };

export type QueryQueryVariables = Exact<{
  findPermissionsByUserId: Scalars['Float']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', findPermissionsByUser: Array<string> };

export type PaginatedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', data: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number, organization?: { __typename?: 'Organization', id: string, name: string, status: string } | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedPlansQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPlansQuery = { __typename?: 'Query', paginatedPlans: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponId?: string | null, package: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string } }> } };

export type PaginatedPermissionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPermissionsQuery = { __typename?: 'Query', paginatedPermissions: { __typename?: 'PaginatedPermissions', data: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedRolesQuery = { __typename?: 'Query', paginatedRoles: { __typename?: 'PaginatedRoles', data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string, permissionCount: number, permissions: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }>, organization?: { __typename?: 'Organization', id: string, name: string, status: string, description?: string | null } | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type AllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPermissionsQuery = { __typename?: 'Query', allPermissions: { __typename?: 'DynamicPermissionsDto', apps: Array<{ __typename?: 'AppPermissionsDto', appName: string, modules: Array<{ __typename?: 'PermissionGroupDto', name: string, permissions: Array<{ __typename?: 'PermissionDto', id: number, module: string, action: string, description: string, slug: string }> }> }> } };


export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpRequestDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpRequestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpGeneratedSuccessfully"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const EnableOrganizationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableOrganizationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableOrganizationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EnableOrganizationStatusMutation, EnableOrganizationStatusMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateModuleMutation, CreateModuleMutationVariables>;
export const UpdateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const ChangeModuleStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeModuleStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModuleStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeModuleStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ApplicationModule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ApplicationModuleArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeModuleStatusMutation, ChangeModuleStatusMutationVariables>;
export const DeleteModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const CreateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreateCouponMutation, CreateCouponMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ChangeUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>;
export const UpdateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdateCouponMutation, UpdateCouponMutationVariables>;
export const ChangeCouponStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCouponStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CouponStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeCouponStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coupon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CouponArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeCouponStatusMutation, ChangeCouponStatusMutationVariables>;
export const DeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteCouponMutation, DeleteCouponMutationVariables>;
export const PaginatedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPackagesQuery, PaginatedPackagesQueryVariables>;
export const CreatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreatePackageMutation, CreatePackageMutationVariables>;
export const UpdatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const DeletePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeletePackageMutation, DeletePackageMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EnableProjectStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableProjectStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableProjectStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EnableProjectStatusMutation, EnableProjectStatusMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const CreateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOfferInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOfferDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOfferInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreateOfferMutation, CreateOfferMutationVariables>;
export const UpdateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOfferDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOfferInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdateOfferMutation, UpdateOfferMutationVariables>;
export const ChangeOfferStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeOfferStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeOfferStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOfferStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Offer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OfferArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeOfferStatusMutation, ChangeOfferStatusMutationVariables>;
export const DeleteOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const ChangePlanStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePlanStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePlanStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangePlanStatusMutation, ChangePlanStatusMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const DeletePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePermissionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePermissionId"}}}]}]}}]} as unknown as DocumentNode<DeletePermissionMutation, DeletePermissionMutationVariables>;
export const CreatePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePermissionDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreatePermissionMutation, CreatePermissionMutationVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const ModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ModulesQuery, ModulesQueryVariables>;
export const PaginatedOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOrganizationQuery, PaginatedOrganizationQueryVariables>;
export const PaginatedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedUsersQuery, PaginatedUsersQueryVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const PaginatedModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedModulesQuery, PaginatedModulesQueryVariables>;
export const PaginatedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedCouponsQuery, PaginatedCouponsQueryVariables>;
export const PaginatedSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedSubscriptionsQuery, PaginatedSubscriptionsQueryVariables>;
export const PaginatedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOffersQuery, PaginatedOffersQueryVariables>;
export const DropdownOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cashbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<DropdownOffersQuery, DropdownOffersQueryVariables>;
export const DashboardCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleCount"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"assignedPermissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"projectCount"}},{"kind":"Field","name":{"kind":"Name","value":"organizationCount"}},{"kind":"Field","name":{"kind":"Name","value":"couponCount"}},{"kind":"Field","name":{"kind":"Name","value":"offerCount"}},{"kind":"Field","name":{"kind":"Name","value":"moduleCount"}},{"kind":"Field","name":{"kind":"Name","value":"packageCount"}},{"kind":"Field","name":{"kind":"Name","value":"planCount"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionCount"}},{"kind":"Field","name":{"kind":"Name","value":"packageModuleCount"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionPlanCount"}}]}}]}}]} as unknown as DocumentNode<DashboardCountQuery, DashboardCountQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const PaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedProjectsQuery, PaginatedProjectsQueryVariables>;
export const PaginatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"couponId"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPlansQuery, PaginatedPlansQueryVariables>;
export const PaginatedPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPermissionsQuery, PaginatedPermissionsQueryVariables>;
export const PaginatedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedRolesQuery, PaginatedRolesQueryVariables>;
export const AllPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPermissionsQuery, AllPermissionsQueryVariables>;