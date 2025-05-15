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
  JSONObject: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  content?: Maybe<Scalars['String']['output']>;
  contentJson?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
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

export type Breakdown = {
  __typename?: 'Breakdown';
  breakdownDate: Scalars['DateTime']['output'];
  breakdownDescription?: Maybe<Scalars['String']['output']>;
  breakdownLocation: Scalars['String']['output'];
  breakdownType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  media: Array<BreakdownMedia>;
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statuses: Array<BreakdownStatus>;
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

export type BreakdownStatus = {
  __typename?: 'BreakdownStatus';
  approver?: Maybe<User>;
  approverId?: Maybe<Scalars['Float']['output']>;
  breakdown: Breakdown;
  breakdownId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BreakdownStatusDto = {
  approverId?: InputMaybe<Scalars['Float']['input']>;
  assignId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  remark: Scalars['String']['input'];
  status: Breakdown_Status;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
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

export type CreateAboutDto = {
  content: Scalars['String']['input'];
  contentJson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Array<MediaDto>>;
  vehicleId: Scalars['Float']['input'];
};

export type CreateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  minOrderAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  usageLimit: Scalars['Float']['input'];
};

export type CreateFollowUpDto = {
  body: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type CreateMeetingDto = {
  attendees?: InputMaybe<Scalars['JSON']['input']>;
  endTime: Scalars['String']['input'];
  meetingAgenda?: InputMaybe<Scalars['String']['input']>;
  meetingDate: Scalars['DateTime']['input'];
  meetingReference: Scalars['String']['input'];
  meetingTypeId: Scalars['Float']['input'];
  meetingUrl?: InputMaybe<Scalars['String']['input']>;
  meetingVenueId?: InputMaybe<Scalars['Float']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
  title: Scalars['String']['input'];
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTaskDto = {
  assigneeId?: InputMaybe<Scalars['Float']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  completePercent?: InputMaybe<Scalars['Float']['input']>;
  completedDate?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate: Scalars['DateTime']['input'];
  meetingId?: InputMaybe<Scalars['Float']['input']>;
  notesId?: InputMaybe<Scalars['Float']['input']>;
  openedDate: Scalars['DateTime']['input'];
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Float']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
  weightType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMeetingTypeDto = {
  name: Scalars['String']['input'];
};

export type CreateMeetingVenueDto = {
  address: Scalars['String']['input'];
  contactNumber: Scalars['Float']['input'];
  contactPerson: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateModuleDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateMultipleOrderInput = {
  amount: Scalars['Float']['input'];
  couponCode?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  planIds: Array<Scalars['Int']['input']>;
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
  description: Scalars['String']['input'];
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  offerType?: InputMaybe<Scalars['String']['input']>;
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
  couponCode?: InputMaybe<Scalars['String']['input']>;
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
  couponCode?: InputMaybe<Scalars['String']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  planIds: Array<Scalars['Int']['input']>;
  price: Scalars['Float']['input'];
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  designation: Designation;
  email: Scalars['String']['input'];
  mobileNo: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Float']['input']>;
  roleIds: Array<Scalars['Int']['input']>;
  userType?: InputMaybe<UserType>;
};

export type CreateVehicleDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  chassisNumber: Scalars['String']['input'];
  color: Scalars['String']['input'];
  insurance: Scalars['Boolean']['input'];
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
  maintenanceHistory?: InputMaybe<Scalars['String']['input']>;
  make: Scalars['String']['input'];
  model: Scalars['String']['input'];
  numberPlate: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type CreateVehicleExpenseDto = {
  amount: Scalars['Float']['input'];
  breakDownId?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  expenseDate: Scalars['String']['input'];
  expenseType: Scalars['String']['input'];
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
  vehicleId: Scalars['Float']['input'];
};

export type CreateWarehouseDto = {
  capacity: Scalars['Float']['input'];
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['Float']['input'];
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
  pageCount?: Maybe<Scalars['Int']['output']>;
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
  SuperAdmin = 'SUPER_ADMIN',
  TeamLead = 'TEAM_LEAD'
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

export type InputPermissionSlugDto = {
  permissionSlug: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  batchNumber?: Maybe<Scalars['String']['output']>;
  currentStock: Scalars['Float']['output'];
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  minStockLevel: Scalars['Float']['output'];
  openingStock: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  warehouse: Warehouse;
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

export type Logs = {
  __typename?: 'Logs';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  module: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userAgent: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Material = {
  __typename?: 'Material';
  barcode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type MediaDto = {
  mediaType: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Meeting = {
  __typename?: 'Meeting';
  attendees?: Maybe<Scalars['JSON']['output']>;
  attendeesNames?: Maybe<Array<Scalars['String']['output']>>;
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
  meetingType: MeetingType;
  meetingTypeId: Scalars['Float']['output'];
  meetingUrl?: Maybe<Scalars['String']['output']>;
  meetingVenue?: Maybe<MeetingVenue>;
  meetingVenueId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Array<Notes>>;
  parentMeeting?: Maybe<Meeting>;
  parentMeetingId?: Maybe<Scalars['Float']['output']>;
  projectId?: Maybe<Scalars['Float']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  task?: Maybe<Array<MeetingTask>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type MeetingArray = {
  __typename?: 'MeetingArray';
  data: Array<Meeting>;
};

export type MeetingAttendeeDto = {
  __typename?: 'MeetingAttendeeDTO';
  userId: Scalars['Float']['output'];
  userName: Scalars['String']['output'];
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
  assigneeName?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  completePercent?: Maybe<Scalars['Float']['output']>;
  completedDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meetingId?: Maybe<Scalars['Float']['output']>;
  meetingTask?: Maybe<Meeting>;
  notesId?: Maybe<Scalars['Float']['output']>;
  notesTask?: Maybe<Notes>;
  openedDate: Scalars['DateTime']['output'];
  ownerId?: Maybe<Scalars['Float']['output']>;
  ownerName?: Maybe<Scalars['String']['output']>;
  parentTask?: Maybe<MeetingTask>;
  parentTaskId?: Maybe<Scalars['Float']['output']>;
  priority: Scalars['String']['output'];
  projectId?: Maybe<Scalars['Float']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  subtasks?: Maybe<Array<MeetingTask>>;
  task?: Maybe<Scalars['String']['output']>;
  totalTaskComplete?: Maybe<Scalars['Float']['output']>;
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

export type MultipleDeviceNotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  tokens: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMediaToBreakdown: Array<BreakdownMedia>;
  applyCouponToPlan: Plan;
  assignModuleToPkg: Package;
  assignPermissionsToRole: Role;
  assignPlanToSubscription: Subscriptions;
  assignRoleToUser: User;
  changeBreakdownStatus: BreakdownStatus;
  changeCouponStatus: CouponOrCoupons;
  changeModuleStatus: ApplicationModuleUnion;
  changeOfferStatus: OfferUnion;
  changePackageStatus: PackageUnion;
  changePassword: Scalars['Boolean']['output'];
  changePlanStatus: PlanOrPlans;
  changeRoleStatus: RoleUnion;
  changeSubscriptionStatus: SubscriptionsUnion;
  changeUserStatus: UserUnion;
  changeVehicleExpenseStatus: VehicleExpenseStatus;
  changeWarehouseStatus: Warehouse;
  createBreakdown: Breakdown;
  createCoupon: Coupon;
  createDynamicPage: About;
  createFollowUp: FollowUp;
  createMeeting: Meeting;
  createMeetingTask: MeetingTask;
  createMeetingType: MeetingType;
  createMeetingVenue: MeetingVenue;
  createModule: ApplicationModule;
  createMultipleOrder: Scalars['JSONObject']['output'];
  createNotePad: NotePad;
  createNotes: Array<Notes>;
  createOffer: Offer;
  createOrganization: Organization;
  createPackage: Package;
  createPermission: Permissions;
  createPlan: Plan;
  createProject: Project;
  createRole: Role;
  createSubTasks: Array<MeetingTask>;
  createSubscription: Subscriptions;
  createSubscriptionWithPlans: Subscriptions;
  createUser: User;
  createVehicle: Vehicle;
  createVehicleExpense: VehicleExpense;
  createWarehouse: Warehouse;
  deleteBreakdown: Scalars['Boolean']['output'];
  deleteCoupon: Scalars['Boolean']['output'];
  deleteDynamicPage: Scalars['Boolean']['output'];
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
  deleteVehicle: Scalars['Boolean']['output'];
  deleteVehicleExpense: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  enableMeetingStatus: MeetingOrMeetings;
  enableMeetingTaskStatus: MeetingTaskOrMeetingTasks;
  enableNotePad: NotePadOrNotePads;
  enableOrganizationStatus: OrganizationUnion;
  enableProjectStatus: ProjectUnion;
  enableVehicleStatus: Vehicle;
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
  hardDeleteWarehouse: Scalars['Boolean']['output'];
  login: LoginRes;
  logout: Scalars['Boolean']['output'];
  register: LoginRes;
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
  restoreVehicle: Scalars['Boolean']['output'];
  restoreVehicleBreakdown: Scalars['Boolean']['output'];
  restoreVehicleExpense: Scalars['Boolean']['output'];
  restoreWarehouse: Scalars['Boolean']['output'];
  sendMultiplePushNotification: NotificationResponse;
  sendPushNotification: NotificationResponse;
  sendRegistrationOtp: OtpRes;
  sendTopicNotification: NotificationResponse;
  updateBreakdown: Breakdown;
  updateCoupon: Coupon;
  updateDynamicPage: About;
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
  updateVehicle: Vehicle;
  updateVehicleExpense: VehicleExpense;
  updateWarehouse: Warehouse;
  verifyPayment: Array<Subscriptions>;
};


export type MutationAddMediaToBreakdownArgs = {
  data: BreakdownMediaDto;
};


export type MutationApplyCouponToPlanArgs = {
  couponCode: Scalars['String']['input'];
  planId: Scalars['Int']['input'];
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


export type MutationChangeVehicleExpenseStatusArgs = {
  data: VehicleExpenseStatusDto;
};


export type MutationChangeWarehouseStatusArgs = {
  data: WarehouseStatusDto;
};


export type MutationCreateBreakdownArgs = {
  data: CreateBreakdownDto;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponDto;
};


export type MutationCreateDynamicPageArgs = {
  data: CreateAboutDto;
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


export type MutationCreateMultipleOrderArgs = {
  input: CreateMultipleOrderInput;
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


export type MutationCreateSubTasksArgs = {
  input: Array<CreateMeetingTaskDto>;
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


export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleDto;
};


export type MutationCreateVehicleExpenseArgs = {
  data: CreateVehicleExpenseDto;
};


export type MutationCreateWarehouseArgs = {
  CreateWarehouseDto: CreateWarehouseDto;
};


export type MutationDeleteBreakdownArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCouponArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationDeleteDynamicPageArgs = {
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


export type MutationDeleteVehicleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteVehicleExpenseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['Float']['input'];
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


export type MutationEnableVehicleStatusArgs = {
  data: VehicleStatusDto;
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


export type MutationHardDeleteWarehouseArgs = {
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


export type MutationRestoreVehicleArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreVehicleBreakdownArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreVehicleExpenseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRestoreWarehouseArgs = {
  id: Scalars['Float']['input'];
};


export type MutationSendMultiplePushNotificationArgs = {
  data: MultipleDeviceNotificationDto;
};


export type MutationSendPushNotificationArgs = {
  data: NotificationDto;
};


export type MutationSendRegistrationOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendTopicNotificationArgs = {
  data: TopicNotificationDto;
};


export type MutationUpdateBreakdownArgs = {
  data: UpdateBreakdownDto;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponDto;
};


export type MutationUpdateDynamicPageArgs = {
  data: UpdateAboutDto;
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


export type MutationUpdateVehicleArgs = {
  updateVehicleInput: UpdateVehicleDto;
};


export type MutationUpdateVehicleExpenseArgs = {
  updateVehicleExpenseInput: UpdateVehicleExpenseDto;
};


export type MutationUpdateWarehouseArgs = {
  UpdateWarehouseDto: UpdateWarehouseDto;
};


export type MutationVerifyPaymentArgs = {
  input: VerifyPaymentInput;
};

export type NotePad = {
  __typename?: 'NotePad';
  UserId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
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
  createdBy: User;
  createdByUserId: Scalars['ID']['output'];
  decision?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meetingId?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Array<MeetingTask>>;
  uploadDoc?: Maybe<Scalars['String']['output']>;
};

export type NotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Notifications = {
  __typename?: 'Notifications';
  actionUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  module: VehicleModuleType;
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  userBy?: Maybe<User>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<Scalars['String']['output']>;
  discountPercent?: Maybe<Scalars['Float']['output']>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
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

export type PaginatedAbout = {
  __typename?: 'PaginatedAbout';
  data: Array<About>;
  meta: Meta;
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

export type PaginatedFollowUp = {
  __typename?: 'PaginatedFollowUp';
  data: Array<FollowUp>;
  meta: Meta;
};

export type PaginatedLogs = {
  __typename?: 'PaginatedLogs';
  data: Array<Logs>;
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

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  data: Array<Notifications>;
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

export type PaginatedVehicleExpense = {
  __typename?: 'PaginatedVehicleExpense';
  data: Array<VehicleExpense>;
  meta: Meta;
};

export type PaginatedVehicles = {
  __typename?: 'PaginatedVehicles';
  data: Array<Vehicle>;
  meta: Meta;
};

export type PaginatedWarehouse = {
  __typename?: 'PaginatedWarehouse';
  data: Array<Warehouse>;
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
  coupon?: Maybe<Coupon>;
  couponCode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Float']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  package?: Maybe<Package>;
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
  MeetingHierarchyTree: Array<Meeting>;
  MeetingTaskCalender: Array<MeetingTask>;
  allPermissions: DynamicPermissionsDto;
  breakdownDropdown: PaginatedBreakdowns;
  couponsDropdown: PaginatedCoupons;
  dashboardCount: DashboardCount;
  dashboardVehicleCount: VehicleDashboardCount;
  dropDownMeeting: PaginatedMeeting;
  dropDownMeetingTask: PaginatedMeetingTask;
  dropDownMeetingType: PaginatedMeetingType;
  dropDownMeetingVenue: PaginatedMeetingVenue;
  dropDownNotes: PaginatedNotes;
  dropdownOffers: PaginatedOffers;
  dropdownRoles: PaginatedRoles;
  filteredMeetingTasks: PaginatedMeetingTask;
  findBreakdownById: Breakdown;
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
  findVehicleById: Vehicle;
  findVehicleExpenseById: VehicleExpense;
  findWarehouseById: Warehouse;
  getAllDynamicPage: PaginatedAbout;
  getAllMeetingTypes: Array<MeetingType>;
  getAllNotePad: Array<NotePad>;
  getBreakdownStatuses: Array<BreakdownStatus>;
  getBreakdownTypeSuggestions: Array<Scalars['JSON']['output']>;
  getDynamicPageById: About;
  getFollowUpById: FollowUp;
  getMeetingDashboard: Dashboard;
  getMeetingId: Meeting;
  getMeetingIdTask: MeetingTask;
  getMeetingType: MeetingType;
  getMeetingVenue: MeetingVenue;
  getNotePadById: NotePad;
  getNotesId: Notes;
  getPaginatedMeetingTaskByMeetingId: PaginatedMeetingTask;
  getPaginatedNotesByMeetingId: PaginatedNotes;
  getUpcomingMeetingTask: PaginatedMeetingTask;
  getUpcomingMeetings: PaginatedMeeting;
  getUsersWithPermission: Array<User>;
  getVehicleExpenseStatuses: Array<VehicleExpenseStatus>;
  getVehicleExpenseTypeSuggestions: Array<Scalars['JSON']['output']>;
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
  packagesDropdown: PaginatedPackages;
  paginatedBreakdowns: PaginatedBreakdowns;
  paginatedCoupons: PaginatedCoupons;
  paginatedFollowUp: PaginatedFollowUp;
  paginatedLogs: PaginatedLogs;
  paginatedMeeting: PaginatedMeeting;
  paginatedMeetingParentId: PaginatedMeeting;
  paginatedMeetingSubTask: PaginatedMeetingTask;
  paginatedMeetingTask: PaginatedMeetingTask;
  paginatedMeetingType: PaginatedMeetingType;
  paginatedMeetingVenue: PaginatedMeetingVenue;
  paginatedMeetingsForUserId: PaginatedMeeting;
  paginatedModules: PaginatedApplicationModules;
  paginatedNotePad: PaginatedNotePad;
  paginatedNotes: PaginatedNotes;
  paginatedOffers: PaginatedOffers;
  paginatedOrganization: PaginatedOrganizations;
  paginatedPackages: PaginatedPackages;
  paginatedPermissions: PaginatedPermissions;
  paginatedPlans: PaginatedPlans;
  paginatedPlansForList: PaginatedPlans;
  paginatedProjects: PaginatedProjects;
  paginatedRoles: PaginatedRoles;
  paginatedSubscriptions: PaginatedSubscriptions;
  paginatedTrashedWarehouses: PaginatedWarehouse;
  paginatedUsers: PaginatedUsers;
  paginatedVehicleExpense: PaginatedVehicleExpense;
  paginatedVehicleNotification: PaginatedNotifications;
  paginatedVehicles: PaginatedVehicles;
  paginatedWarehouses: PaginatedWarehouse;
  permissionGroup: PermissionGroup;
  post: Post;
  posts: Array<Post>;
  project: Project;
  trashedCoupons: PaginatedCoupons;
  trashedModules: PaginatedApplicationModules;
  trashedOffers: PaginatedOffers;
  trashedPackages: PaginatedPackages;
  trashedPlans: PaginatedPlans;
  trashedSubscriptions: PaginatedSubscriptions;
  trashedUsers: PaginatedUsers;
  userHierarchy: Array<User>;
  vehiclesDropdown: PaginatedVehicles;
};


export type QueryMeetingCalenderArgs = {
  filters?: InputMaybe<MeetingFiltersDto>;
};


export type QueryMeetingHierarchyTreeArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
  parentMeetingId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMeetingTaskCalenderArgs = {
  filters?: InputMaybe<MeetingTaskFiltersDto>;
};


export type QueryBreakdownDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryCouponsDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryDashboardCountArgs = {
  filters: ReportFilters;
};


export type QueryDashboardVehicleCountArgs = {
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


export type QueryDropdownRolesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryFilteredMeetingTasksArgs = {
  assigneeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  query: ListInputDto;
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


export type QueryFindVehicleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindVehicleExpenseByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindWarehouseByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAllDynamicPageArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryGetBreakdownStatusesArgs = {
  breakdownId: Scalars['Int']['input'];
};


export type QueryGetBreakdownTypeSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDynamicPageByIdArgs = {
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


export type QueryGetPaginatedMeetingTaskByMeetingIdArgs = {
  meetingId: Scalars['Int']['input'];
  query: ListInputDto;
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


export type QueryGetUsersWithPermissionArgs = {
  data: InputPermissionSlugDto;
};


export type QueryGetVehicleExpenseStatusesArgs = {
  expenseId: Scalars['Int']['input'];
};


export type QueryGetVehicleExpenseTypeSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
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


export type QueryPackagesDropdownArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedBreakdownsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedCouponsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedFollowUpArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedLogsArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedMeetingParentIdArgs = {
  parentMeetingId: Scalars['Int']['input'];
  query: ListInputDto;
};


export type QueryPaginatedMeetingSubTaskArgs = {
  parentTaskId: Scalars['Int']['input'];
  query: ListInputDto;
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


export type QueryPaginatedMeetingsForUserIdArgs = {
  query: ListInputDto;
  userId: Scalars['Int']['input'];
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


export type QueryPaginatedPlansForListArgs = {
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


export type QueryPaginatedTrashedWarehousesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedUsersArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehicleExpenseArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehicleNotificationArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedVehiclesArgs = {
  ListInputDTO: ListInputDto;
};


export type QueryPaginatedWarehousesArgs = {
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
  nameFilter?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVehiclesDropdownArgs = {
  ListInputDTO: ListInputDto;
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
  coupon?: Maybe<Coupon>;
  couponCode?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  paymentId?: Maybe<Scalars['String']['output']>;
  plans: Array<Plan>;
  price: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type SubscriptionsArray = {
  __typename?: 'SubscriptionsArray';
  data: Array<Subscriptions>;
};

export type SubscriptionsUnion = Subscriptions | SubscriptionsArray;

export type Supplier = {
  __typename?: 'Supplier';
  address?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gstNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type TopicNotificationDto = {
  body: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};

export type Unit = {
  __typename?: 'Unit';
  conversionFactor?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentUnit?: Maybe<Unit>;
  parentUnitId?: Maybe<Scalars['Int']['output']>;
  symbol: Scalars['String']['output'];
  type: UnitType;
  updatedAt: Scalars['DateTime']['output'];
};

/** UnitType */
export enum UnitType {
  Area = 'area',
  Density = 'density',
  Length = 'length',
  Time = 'time',
  Volume = 'volume',
  Weight = 'weight'
}

export type UpdateAboutDto = {
  content: Scalars['String']['input'];
  contentJson: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  imageUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateBreakdownDto = {
  breakdownDate: Scalars['String']['input'];
  breakdownDescription: Scalars['String']['input'];
  breakdownLocation: Scalars['String']['input'];
  breakdownType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Array<MediaDto>>;
  removedFileIds?: InputMaybe<Array<Scalars['String']['input']>>;
  vehicleId: Scalars['Float']['input'];
};

export type UpdateCouponDto = {
  couponCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountValue: Scalars['Float']['input'];
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
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
  attendees?: InputMaybe<Scalars['JSON']['input']>;
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
  projectName?: InputMaybe<Scalars['String']['input']>;
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
  parentTaskId?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
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
  description: Scalars['String']['input'];
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  offerType?: InputMaybe<Scalars['String']['input']>;
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
  couponCode?: InputMaybe<Scalars['String']['input']>;
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
  couponCode?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateVehicleDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  chassisNumber?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  insurance?: InputMaybe<Scalars['Boolean']['input']>;
  insuranceValidTill?: InputMaybe<Scalars['String']['input']>;
  maintenanceHistory?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  numberPlate?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVehicleExpenseDto = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  breakDownId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['String']['input']>;
  expenseType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  uploadDoc?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWarehouseDto = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  designation?: Maybe<Designation>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meetingAttendees: Array<Meeting>;
  mobileNo?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['Float']['output']>;
  parent?: Maybe<User>;
  parentId?: Maybe<Scalars['Float']['output']>;
  posts: Array<Post>;
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

export type Vehicle = {
  __typename?: 'Vehicle';
  avatar?: Maybe<Scalars['String']['output']>;
  chassisNumber: Scalars['String']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  insurance: Scalars['Boolean']['output'];
  insuranceValidTill?: Maybe<Scalars['DateTime']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maintenanceHistory?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  numberPlate: Scalars['String']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['String']['output'];
};

export type VehicleDashboardCount = {
  __typename?: 'VehicleDashboardCount';
  breakdownCount?: Maybe<Scalars['Int']['output']>;
  expenseCount?: Maybe<Scalars['Int']['output']>;
  vehicleCount?: Maybe<Scalars['Int']['output']>;
};

export type VehicleExpense = {
  __typename?: 'VehicleExpense';
  amount: Scalars['Float']['output'];
  breakDown?: Maybe<Breakdown>;
  breakDownId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expenseDate?: Maybe<Scalars['DateTime']['output']>;
  expenseType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizationBy: Organization;
  organizationId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  statuses?: Maybe<Array<VehicleExpenseStatus>>;
  updatedAt: Scalars['DateTime']['output'];
  uploadDoc?: Maybe<Scalars['String']['output']>;
  vehicle: Vehicle;
  vehicleId: Scalars['Int']['output'];
};

export type VehicleExpenseStatus = {
  __typename?: 'VehicleExpenseStatus';
  approver?: Maybe<User>;
  approverId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Float']['output']>;
  expense: VehicleExpense;
  expenseId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type VehicleExpenseStatusDto = {
  approverId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  remark: Scalars['String']['input'];
  status: Vehicle_Expense_Status;
};

export enum VehicleModuleType {
  Vehicle = 'VEHICLE',
  VehicleBreakdown = 'VEHICLE_BREAKDOWN',
  VehicleExpense = 'VEHICLE_EXPENSE'
}

export type VehicleStatusDto = {
  id: Scalars['Float']['input'];
  status: Vehicle_Status;
};

export type VerifyPaymentInput = {
  amount: Scalars['Float']['input'];
  couponCode?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Float']['input'];
  planIds: Array<Scalars['Int']['input']>;
  razorpayOrderId: Scalars['String']['input'];
  razorpayPaymentId: Scalars['String']['input'];
  razorpaySignature: Scalars['String']['input'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  capacity: Scalars['Float']['output'];
  contactPerson?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
};

/** Warehouse Status */
export enum WarehouseStatus {
  Active = 'active',
  Full = 'full',
  Inactive = 'inactive',
  OutOfStock = 'outOfStock'
}

export type WarehouseStatusDto = {
  id: Scalars['Float']['input'];
  status: WarehouseStatus;
};

export enum AppName {
  MasterApp = 'MasterApp',
  MaterialManagement = 'MaterialManagement',
  TaskManagement = 'TaskManagement',
  VehicleManagement = 'VehicleManagement'
}

export enum Breakdown_Status {
  Approved = 'approved',
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  InService = 'in_service',
  Pending = 'pending',
  Rejected = 'rejected',
  RepairFailed = 'repair_failed',
  Repaired = 'repaired',
  ServiceScheduled = 'service_scheduled',
  UnderReview = 'under_review'
}

export enum Vehicle_Expense_Status {
  Approved = 'approved',
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  Completed = 'completed',
  InProgress = 'in_progress',
  Pending = 'pending',
  Rejected = 'rejected',
  UnderReview = 'under_review'
}

export enum Vehicle_Status {
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', accessToken: string, user: { __typename?: 'User', id: string, email: string, name: string, userType: UserType } } };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginRes', accessToken: string, user: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, createdAt: any, updatedAt: any, deletedAt?: any | null, designation?: Designation | null, roles?: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string, permissionCount: number }> | null, parent?: { __typename?: 'User', parent?: { __typename?: 'User', id: string } | null } | null } } };

export type SendRegistrationOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendRegistrationOtpMutation = { __typename?: 'Mutation', sendRegistrationOtp: { __typename?: 'OtpRes', otpGeneratedSuccessfully: boolean, otp?: number | null, message?: string | null } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType } };

export type HardDeleteUserMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteUserMutation = { __typename?: 'Mutation', hardDeleteUser: boolean };

export type DeleteUserMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ChangeUserStatusMutationVariables = Exact<{
  data: UserStatusDto;
}>;


export type ChangeUserStatusMutation = { __typename?: 'Mutation', changeUserStatus: { __typename?: 'User', id: string, status: string } | { __typename?: 'UserArray', data: Array<{ __typename?: 'User', id: string, status: string }> } };

export type RestoreUserMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreUserMutation = { __typename?: 'Mutation', restoreUser: boolean };

export type CreateRoleMutationVariables = Exact<{
  data: CreateRoleDto;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: string, description?: string | null } };

export type UpdateRoleMutationVariables = Exact<{
  data: UpdateRoleDto;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', description?: string | null, id: string, name: string } };

export type DeleteRoleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: boolean };

export type HardDeleteRoleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteRoleMutation = { __typename?: 'Mutation', hardDeleteRole: boolean };

export type RestoreRoleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreRoleMutation = { __typename?: 'Mutation', restoreRole: boolean };

export type ChangeRoleStatusMutationVariables = Exact<{
  data: RoleStatusDto;
}>;


export type ChangeRoleStatusMutation = { __typename?: 'Mutation', changeRoleStatus: { __typename?: 'Role', id: string, status: string } | { __typename?: 'RoleArray', data: Array<{ __typename?: 'Role', id: string, status: string }> } };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserDto;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null } };

export type CreatePermissionMutationVariables = Exact<{
  data: CreatePermissionDto;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', createPermission: { __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string } };

export type UpdatePermissionMutationVariables = Exact<{
  data: UpdatePermissionDto;
}>;


export type UpdatePermissionMutation = { __typename?: 'Mutation', updatePermission: { __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string } };

export type DeletePermissionMutationVariables = Exact<{
  deletePermissionId: Scalars['Float']['input'];
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deletePermission: boolean };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationDto;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type UpdateOrganizationMutationVariables = Exact<{
  updateOrganizationInput: UpdateOrganizationDto;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } };

export type DeleteOrganizationMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: boolean };

export type HardDeleteOrganizationMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteOrganizationMutation = { __typename?: 'Mutation', hardDeleteOrganization: boolean };

export type RestoreOrganizationMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreOrganizationMutation = { __typename?: 'Mutation', restoreOrganization: boolean };

export type ListTrashedOrganizationsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedOrganizationsQuery = { __typename?: 'Query', listTrashedOrganizations: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, status: string }> } };

export type EnableOrganizationStatusMutationVariables = Exact<{
  data: OrganizationStatusDto;
}>;


export type EnableOrganizationStatusMutation = { __typename?: 'Mutation', enableOrganizationStatus: { __typename?: 'Organization', id: string, name: string, description?: string | null, status: string } | { __typename?: 'OrganizationArray', data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectDto;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, description?: string | null, organizationId: number } };

export type UpdateProjectMutationVariables = Exact<{
  updateProjectInput: UpdateProjectDto;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number } };

export type DeleteProjectMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type EnableProjectStatusMutationVariables = Exact<{
  data: ProjectStatusDto;
}>;


export type EnableProjectStatusMutation = { __typename?: 'Mutation', enableProjectStatus: { __typename?: 'Project', id: string, status: string } | { __typename?: 'ProjectArray', data: Array<{ __typename?: 'Project', id: string, status: string }> } };

export type CreateModuleMutationVariables = Exact<{
  createModuleInput: CreateModuleDto;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type UpdateModuleMutationVariables = Exact<{
  updateModuleInput: UpdateModuleDto;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } };

export type DeleteModuleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteModuleMutation = { __typename?: 'Mutation', deleteModule: boolean };

export type HardDeleteModuleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteModuleMutation = { __typename?: 'Mutation', hardDeleteModule: boolean };

export type RestoreModuleMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreModuleMutation = { __typename?: 'Mutation', restoreModule: boolean };

export type ChangeModuleStatusMutationVariables = Exact<{
  updateModuleStatusInput: ModuleStatusDto;
}>;


export type ChangeModuleStatusMutation = { __typename?: 'Mutation', changeModuleStatus: { __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string } | { __typename?: 'ApplicationModuleArray', data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }> } };

export type TrashedModulesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedModulesQuery = { __typename?: 'Query', trashedModules: { __typename?: 'PaginatedApplicationModules', meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number }, data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, status: string, description?: string | null }> } };

export type CreateCouponMutationVariables = Exact<{
  createCouponInput: CreateCouponDto;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createCoupon: { __typename?: 'Coupon', couponCode: string, description?: string | null, discountValue?: number | null, endDate: any, id: string, minOrderAmount?: number | null, startDate: any, status: string, usageLimit: number } };

export type UpdateCouponMutationVariables = Exact<{
  updateCouponInput: UpdateCouponDto;
}>;


export type UpdateCouponMutation = { __typename?: 'Mutation', updateCoupon: { __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, minOrderAmount?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type DeleteCouponMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCouponMutation = { __typename?: 'Mutation', deleteCoupon: boolean };

export type HardDeleteCouponMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteCouponMutation = { __typename?: 'Mutation', hardDeleteCoupon: boolean };

export type RestoreCouponMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreCouponMutation = { __typename?: 'Mutation', restoreCoupon: boolean };

export type ChangeCouponStatusMutationVariables = Exact<{
  updateCouponStatusInput: CouponStatusDto;
}>;


export type ChangeCouponStatusMutation = { __typename?: 'Mutation', changeCouponStatus: { __typename?: 'Coupon', id: string, status: string } | { __typename?: 'CouponArray', data: Array<{ __typename?: 'Coupon', id: string, status: string }> } };

export type CreateOfferMutationVariables = Exact<{
  createOfferInput: CreateOfferDto;
}>;


export type CreateOfferMutation = { __typename?: 'Mutation', createOffer: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type UpdateOfferMutationVariables = Exact<{
  updateOfferInput: UpdateOfferDto;
}>;


export type UpdateOfferMutation = { __typename?: 'Mutation', updateOffer: { __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any } };

export type DeleteOfferMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer: boolean };

export type HardDeleteOfferMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeleteOfferMutation = { __typename?: 'Mutation', hardDeleteOffer: boolean };

export type ChangeOfferStatusMutationVariables = Exact<{
  updateOfferStatusInput: OfferStatusDto;
}>;


export type ChangeOfferStatusMutation = { __typename?: 'Mutation', changeOfferStatus: { __typename?: 'Offer', id: string, status: string } | { __typename?: 'OfferArray', data: Array<{ __typename?: 'Offer', id: string, status: string }> } };

export type RestoreOfferMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestoreOfferMutation = { __typename?: 'Mutation', restoreOffer: boolean };

export type CreatePackageMutationVariables = Exact<{
  createPackageInput: CreatePackageDto;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', createPackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string }> } };

export type UpdatePackageMutationVariables = Exact<{
  updatePackageInput: UpdatePackageDto;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string } };

export type DeletePackageMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePackageMutation = { __typename?: 'Mutation', deletePackage: boolean };

export type RestorePackageMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestorePackageMutation = { __typename?: 'Mutation', restorePackage: boolean };

export type HardDeletePackageMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeletePackageMutation = { __typename?: 'Mutation', hardDeletePackage: boolean };

export type CreatePlanMutationVariables = Exact<{
  createPlanInput: CreatePlanDto;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null, package?: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string }> } | null } };

export type UpdatePlanMutationVariables = Exact<{
  updatePlanInput: UpdatePlanDto;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null } };

export type DeletePlanMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: boolean };

export type HardDeletePlanMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type HardDeletePlanMutation = { __typename?: 'Mutation', hardDeletePlan: boolean };

export type RestorePlanMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RestorePlanMutation = { __typename?: 'Mutation', restorePlan: boolean };

export type ChangePlanStatusMutationVariables = Exact<{
  updatePlanStatusInput: PlanStatusDto;
}>;


export type ChangePlanStatusMutation = { __typename?: 'Mutation', changePlanStatus: { __typename?: 'Plan', id: string, status: string } | { __typename?: 'PlanArray', data: Array<{ __typename?: 'Plan', id: string, status: string }> } };

export type ApplyCouponToPlanMutationVariables = Exact<{
  planId: Scalars['Int']['input'];
  couponCode: Scalars['String']['input'];
}>;


export type ApplyCouponToPlanMutation = { __typename?: 'Mutation', applyCouponToPlan: { __typename?: 'Plan', id: string, name: string, couponCode?: string | null, discountedPrice?: number | null } };

export type CreateSubscriptionMutationVariables = Exact<{
  createSubscriptionInput: CreateSubscriptionDto;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'Subscriptions', couponCode?: string | null, duration: number, id: string, name: string, price: number, status: string, plans: Array<{ __typename?: 'Plan', id: string }> } };

export type UpdateSubscriptionMutationVariables = Exact<{
  updateSubscriptionInput: UpdateSubscriptionDto;
}>;


export type UpdateSubscriptionMutation = { __typename?: 'Mutation', updateSubscription: { __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string } };

export type DeleteSubscriptionMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteSubscriptionMutation = { __typename?: 'Mutation', deleteSubscription: boolean };

export type ChangeSubscriptionStatusMutationVariables = Exact<{
  updateSubscriptionStatusInput: SubscriptionStatusDto;
}>;


export type ChangeSubscriptionStatusMutation = { __typename?: 'Mutation', changeSubscriptionStatus: { __typename?: 'Subscriptions', id: string, status: string } | { __typename?: 'SubscriptionsArray', data: Array<{ __typename?: 'Subscriptions', id: string, status: string }> } };

export type CreateMultipleOrderMutationVariables = Exact<{
  input: CreateMultipleOrderInput;
}>;


export type CreateMultipleOrderMutation = { __typename?: 'Mutation', createMultipleOrder: any };

export type VerifyPaymentMutationVariables = Exact<{
  input: VerifyPaymentInput;
}>;


export type VerifyPaymentMutation = { __typename?: 'Mutation', verifyPayment: Array<{ __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string, couponCode?: string | null, paymentId?: string | null, plans: Array<{ __typename?: 'Plan', id: string }>, coupon?: { __typename?: 'Coupon', id: string } | null }> };

export type DeleteMetingMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMetingMutation = { __typename?: 'Mutation', deleteMeting: boolean };

export type CreateMeetingTypeMutationVariables = Exact<{
  data: CreateMeetingTypeDto;
}>;


export type CreateMeetingTypeMutation = { __typename?: 'Mutation', createMeetingType: { __typename?: 'MeetingType', id: string, name: string } };

export type UpdateMeetingTypeMutationVariables = Exact<{
  updateMeetingTypeInput: UpdateMeetingTypeDto;
}>;


export type UpdateMeetingTypeMutation = { __typename?: 'Mutation', updateMeetingType: { __typename?: 'MeetingType', id: string, name: string } };

export type DeleteMetingVenueMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMetingVenueMutation = { __typename?: 'Mutation', deleteMetingVenue: boolean };

export type CreateMeetingVenueMutationVariables = Exact<{
  data: CreateMeetingVenueDto;
}>;


export type CreateMeetingVenueMutation = { __typename?: 'Mutation', createMeetingVenue: { __typename?: 'MeetingVenue', id: string, name: string, address?: string | null, contactPerson?: string | null, contactNumber?: number | null, description?: string | null, createdAt: any } };

export type UpdateMeetingVenueMutationVariables = Exact<{
  updateMeetingVenueInput: UpdateMeetingVenueDto;
}>;


export type UpdateMeetingVenueMutation = { __typename?: 'Mutation', updateMeetingVenue: { __typename?: 'MeetingVenue', id: string, name: string, address?: string | null, contactPerson?: string | null, contactNumber?: number | null, description?: string | null } };

export type CreateMeetingMutationVariables = Exact<{
  data: CreateMeetingDto;
}>;


export type CreateMeetingMutation = { __typename?: 'Mutation', createMeeting: { __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null, uploadDoc?: string | null } };

export type UpdateMeetingMutationVariables = Exact<{
  updateMeetingInput: UpdateMeetingDto;
}>;


export type UpdateMeetingMutation = { __typename?: 'Mutation', updateMeeting: { __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null, uploadDoc?: string | null } };

export type DeleteNotesMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteNotesMutation = { __typename?: 'Mutation', deleteNotes: boolean };

export type CreateNotesMutationVariables = Exact<{
  notesData: Array<CreateNotesDto> | CreateNotesDto;
}>;


export type CreateNotesMutation = { __typename?: 'Mutation', createNotes: Array<{ __typename?: 'Notes', id: string, meetingId?: number | null, decision?: string | null, notes?: string | null, uploadDoc?: string | null }> };

export type DeleteMetingTaskMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMetingTaskMutation = { __typename?: 'Mutation', deleteMetingTask: boolean };

export type CreateMeetingTaskMutationVariables = Exact<{
  input: CreateMeetingTaskDto;
}>;


export type CreateMeetingTaskMutation = { __typename?: 'Mutation', createMeetingTask: { __typename?: 'MeetingTask', id: string, ownerId?: number | null, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, task?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, totalTaskComplete?: number | null, weightType?: string | null } };

export type CreateFollowUpMutationVariables = Exact<{
  data: CreateFollowUpDto;
}>;


export type CreateFollowUpMutation = { __typename?: 'Mutation', createFollowUp: { __typename?: 'FollowUp', body?: string | null, id: number, subject?: string | null } };

export type CreateNotePadMutationVariables = Exact<{
  notesData: CreateNotePadDto;
}>;


export type CreateNotePadMutation = { __typename?: 'Mutation', createNotePad: { __typename?: 'NotePad', id: string, notesField?: string | null, status: string } };

export type DeleteNotePadMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteNotePadMutation = { __typename?: 'Mutation', deleteNotePad: boolean };

export type UpdateNotePadMutationVariables = Exact<{
  updateNotesInput: UpdateNotePadDto;
}>;


export type UpdateNotePadMutation = { __typename?: 'Mutation', updateNotePad: { __typename?: 'NotePad', id: string, notesField?: string | null, status: string } };

export type ChangePackageStatusMutationVariables = Exact<{
  updatePackageStatusInput: PackageStatusDto;
}>;


export type ChangePackageStatusMutation = { __typename?: 'Mutation', changePackageStatus: { __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null } | { __typename?: 'PackageArray', data: Array<{ __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null }> } };

export type PaginatedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedRolesQuery = { __typename?: 'Query', paginatedRoles: { __typename?: 'PaginatedRoles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, permissionCount: number, status: string }> } };

export type ListTrashedRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedRolesQuery = { __typename?: 'Query', listTrashedRoles: { __typename?: 'PaginatedRoles', data: Array<{ __typename?: 'Role', description?: string | null, id: string, name: string, permissionCount: number, roleType?: string | null, status: string, organization?: { __typename?: 'Organization', description?: string | null, id: string, name: string, status: string } | null }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type FindRoleByIdQueryVariables = Exact<{
  findRoleByIdId: Scalars['Float']['input'];
}>;


export type FindRoleByIdQuery = { __typename?: 'Query', findRoleById: { __typename?: 'Role', id: string, name: string, description?: string | null, permissions: Array<{ __typename?: 'Permissions', id: string }> } };

export type PaginatedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', paginatedUsers: { __typename?: 'PaginatedUsers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, userType: UserType, designation?: Designation | null, roles?: Array<{ __typename?: 'Role', id: string, name: string }> | null }> } };

export type AllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPermissionsQuery = { __typename?: 'Query', allPermissions: { __typename?: 'DynamicPermissionsDto', apps: Array<{ __typename?: 'AppPermissionsDto', appName: string, modules: Array<{ __typename?: 'PermissionGroupDto', name: string, permissions: Array<{ __typename?: 'PermissionDto', module: string, description: string, action: string, slug: string, id: number }> }> }> } };

export type PaginatedPermissionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPermissionsQuery = { __typename?: 'Query', paginatedPermissions: { __typename?: 'PaginatedPermissions', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string }> } };

export type PaginatedOrganizationQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOrganizationQuery = { __typename?: 'Query', paginatedOrganization: { __typename?: 'PaginatedOrganizations', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Organization', id: string, name: string, description?: string | null, status: string }> } };

export type PaginatedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedProjectsQuery = { __typename?: 'Query', paginatedProjects: { __typename?: 'PaginatedProjects', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, status: string, organizationId: number, organization?: { __typename?: 'Organization', name: string } | null }> } };

export type ListTrashedProjectsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type ListTrashedProjectsQuery = { __typename?: 'Query', listTrashedProjects: { __typename?: 'PaginatedProjects', data: Array<{ __typename?: 'Project', description?: string | null, id: string, name: string, organizationId: number, status: string, createdBy?: { __typename?: 'User', id: string } | null, organization?: { __typename?: 'Organization', id: string, name: string } | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type FindPermissionByIdQueryVariables = Exact<{
  findPermissionByIdId: Scalars['Float']['input'];
}>;


export type FindPermissionByIdQuery = { __typename?: 'Query', findPermissionById: { __typename?: 'Permissions', id: string, appName: string, groupName: string, module: string, action: string, slug: string, description: string } };

export type FindPermsissonByUserIdQueryVariables = Exact<{
  findPermissionsByUserId: Scalars['Float']['input'];
}>;


export type FindPermsissonByUserIdQuery = { __typename?: 'Query', findPermissionsByUser: Array<string> };

export type DashboardCountQueryVariables = Exact<{
  filters: ReportFilters;
}>;


export type DashboardCountQuery = { __typename?: 'Query', dashboardCount: { __typename?: 'DashboardCount', userCount?: number | null, roleCount?: number | null, permissionCount?: number | null, projectCount?: number | null, organizationCount?: number | null, assignedPermissionCount?: number | null } };

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['Float']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, designation?: Designation | null, email: string, status: string, avatar?: string | null, userType: UserType, parentId?: number | null } };

export type UserHierarchyQueryVariables = Exact<{
  parentId?: InputMaybe<Scalars['Int']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserHierarchyQuery = { __typename?: 'Query', userHierarchy: Array<{ __typename?: 'User', id: string, name: string, username?: string | null, mobileNo?: number | null, email: string, status: string, avatar?: string | null, parentId?: number | null, organizationId?: number | null, userType: UserType, designation?: Designation | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null, subordinates?: Array<{ __typename?: 'User', name: string, designation?: Designation | null, username?: string | null }> | null }> | null }> | null }> };

export type PaginatedModulesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedModulesQuery = { __typename?: 'Query', paginatedModules: { __typename?: 'PaginatedApplicationModules', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'ApplicationModule', id: string, name: string, description?: string | null, status: string }> } };

export type PaginatedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedCouponsQuery = { __typename?: 'Query', paginatedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, description?: string | null, minOrderAmount?: number | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type TrashedCouponsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedCouponsQuery = { __typename?: 'Query', trashedCoupons: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', couponCode: string, description?: string | null, endDate: any, id: string, discountValue?: number | null, minOrderAmount?: number | null, startDate: any, status: string, usageLimit: number }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type CouponsDropdownQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type CouponsDropdownQuery = { __typename?: 'Query', couponsDropdown: { __typename?: 'PaginatedCoupons', data: Array<{ __typename?: 'Coupon', id: string, couponCode: string, discountValue?: number | null }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedOffersQuery = { __typename?: 'Query', paginatedOffers: { __typename?: 'PaginatedOffers', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Offer', id: string, title: string, description?: string | null, offerType?: string | null, discountValue?: number | null, usageLimit: number, status: string, startDate: any, endDate: any }> } };

export type TrashedOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedOffersQuery = { __typename?: 'Query', trashedOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', description?: string | null, discountValue?: number | null, endDate: any, id: string, offerType?: string | null, startDate: any, status: string, title: string, usageLimit: number }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type DropdownOffersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownOffersQuery = { __typename?: 'Query', dropdownOffers: { __typename?: 'PaginatedOffers', data: Array<{ __typename?: 'Offer', id: string, title: string, discountValue?: number | null, usageLimit: number }>, meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number } } };

export type PaginatedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPackagesQuery = { __typename?: 'Query', paginatedPackages: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, description?: string | null, price: number, discountedPrice: number, status: string, offerType?: string | null, offerDescription?: string | null, offerExpiryDate?: any | null, modules: Array<{ __typename?: 'ApplicationModule', id: string, description?: string | null, name: string, status: string }> }> } };

export type TrashedPackagesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedPackagesQuery = { __typename?: 'Query', trashedPackages: { __typename?: 'PaginatedPackages', data: Array<{ __typename?: 'Package', description?: string | null, discountedPrice: number, id: string, name: string, price: number, status: string, modules: Array<{ __typename?: 'ApplicationModule', id: string }> }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type FindPackageByIdQueryVariables = Exact<{
  findPackageByIdId: Scalars['Int']['input'];
}>;


export type FindPackageByIdQuery = { __typename?: 'Query', findPackageById: { __typename?: 'Package', name: string, price: number, offerExpiryDate?: any | null, offerDescription?: string | null, discountedPrice: number, description?: string | null, id: string, modules: Array<{ __typename?: 'ApplicationModule', id: string, name: string }> } };

export type PackagesDropdownQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PackagesDropdownQuery = { __typename?: 'Query', packagesDropdown: { __typename?: 'PaginatedPackages', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Package', id: string, name: string, price: number }> } };

export type PaginatedPlansQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPlansQuery = { __typename?: 'Query', paginatedPlans: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null, coupon?: { __typename?: 'Coupon', couponCode: string, id: string } | null, package?: { __typename?: 'Package', id: string, name: string, price: number } | null }> } };

export type TrashedPlansQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedPlansQuery = { __typename?: 'Query', trashedPlans: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, price: number, status: string, duration: number }> } };

export type PaginatedPlansForListQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedPlansForListQuery = { __typename?: 'Query', paginatedPlansForList: { __typename?: 'PaginatedPlans', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null }> } };

export type FindPlanByIdQueryVariables = Exact<{
  findPlanByIdId: Scalars['Int']['input'];
}>;


export type FindPlanByIdQuery = { __typename?: 'Query', findPlanById: { __typename?: 'Plan', id: string, name: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, status: string, couponCode?: string | null } };

export type PaginatedSubscriptionsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedSubscriptionsQuery = { __typename?: 'Query', paginatedSubscriptions: { __typename?: 'PaginatedSubscriptions', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Subscriptions', id: string, name: string, price: number, duration: number, status: string, plans: Array<{ __typename?: 'Plan', id: string }> }> } };

export type TrashedUsersQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type TrashedUsersQuery = { __typename?: 'Query', trashedUsers: { __typename?: 'PaginatedUsers', data: Array<{ __typename?: 'User', avatar?: string | null, createdAt: any, deletedAt?: any | null, email: string, id: string, mobileNo?: number | null, name: string, organizationId?: number | null, parentId?: number | null, status: string, updatedAt: any, userType: UserType, username?: string | null, roles?: Array<{ __typename?: 'Role', id: string, name: string }> | null }>, meta: { __typename?: 'Meta', currentPage: number, limit: number, totalItems: number, totalPages: number } } };

export type QueryQueryVariables = Exact<{
  findPermissionsByUserId: Scalars['Float']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', findPermissionsByUser: Array<string> };

export type GetAllDynamicPageQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetAllDynamicPageQuery = { __typename?: 'Query', getAllDynamicPage: { __typename?: 'PaginatedAbout', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'About', id: string, title: string, slug: string, description?: string | null, imageUrl?: string | null, content?: string | null, contentJson?: string | null }> } };

export type PaginatedMeetingQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingQuery = { __typename?: 'Query', paginatedMeeting: { __typename?: 'PaginatedMeeting', data: Array<{ __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null, uploadDoc?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null }> } };

export type GetAllMeetingTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeetingTypesQuery = { __typename?: 'Query', getAllMeetingTypes: Array<{ __typename?: 'MeetingType', id: string, name: string }> };

export type PaginatedMeetingVenueQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingVenueQuery = { __typename?: 'Query', paginatedMeetingVenue: { __typename?: 'PaginatedMeetingVenue', data: Array<{ __typename?: 'MeetingVenue', id: string, name: string, address?: string | null, contactPerson?: string | null, contactNumber?: number | null, description?: string | null }> } };

export type PaginatedMeetingTypeQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingTypeQuery = { __typename?: 'Query', paginatedMeetingType: { __typename?: 'PaginatedMeetingType', data: Array<{ __typename?: 'MeetingType', name: string, id: string }> } };

export type DeleteMetingTypeMutationVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMetingTypeMutation = { __typename?: 'Mutation', deleteMetingType: boolean };

export type PaginatedNotesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedNotesQuery = { __typename?: 'Query', paginatedNotes: { __typename?: 'PaginatedNotes', data: Array<{ __typename?: 'Notes', decision?: string | null, id: string, meetingId?: number | null, notes?: string | null }> } };

export type GetUpcomingMeetingTaskQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetUpcomingMeetingTaskQuery = { __typename?: 'Query', getUpcomingMeetingTask: { __typename?: 'PaginatedMeetingTask', data: Array<{ __typename?: 'MeetingTask', id: string, ownerId?: number | null, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, task?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, weightType?: string | null }> } };

export type PaginatedMeetingTaskQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedMeetingTaskQuery = { __typename?: 'Query', paginatedMeetingTask: { __typename?: 'PaginatedMeetingTask', data: Array<{ __typename?: 'MeetingTask', id: string, ownerId?: number | null, assigneeId?: number | null, meetingId?: number | null, notesId?: number | null, projectId?: number | null, parentTaskId?: number | null, task?: string | null, comment?: string | null, openedDate: any, dueDate: any, completedDate?: any | null, priority: string, status: string, completePercent?: number | null, totalTaskComplete?: number | null, weightType?: string | null }> } };

export type PaginatedNotePadQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedNotePadQuery = { __typename?: 'Query', paginatedNotePad: { __typename?: 'PaginatedNotePad', data: Array<{ __typename?: 'NotePad', id: string, status: string, notesField?: string | null }> } };

export type GetUpcomingMeetingsQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type GetUpcomingMeetingsQuery = { __typename?: 'Query', getUpcomingMeetings: { __typename?: 'PaginatedMeeting', data: Array<{ __typename?: 'Meeting', id: string, meetingReference: string, projectId?: number | null, createdByUserId: string, meetingVenueId?: number | null, meetingTypeId: number, projectName?: string | null, parentMeetingId?: number | null, title: string, startTime: string, endTime: string, status: string, meetingDate: any, meetingAgenda?: string | null, meetingUrl?: string | null, attendees?: any | null }> } };

export type GetMeetingDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeetingDashboardQuery = { __typename?: 'Query', getMeetingDashboard: { __typename?: 'Dashboard', totalMeetings?: number | null, activeMeetings?: number | null, inactiveMeetings?: number | null, upComingMeeting?: number | null, completedMeeting?: number | null, todayMeeting?: number | null, totalTasks?: number | null, inComingTasks?: number | null, ongoingTasks?: number | null, completedTasks?: number | null } };

export type PaginatedVehiclesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type PaginatedVehiclesQuery = { __typename?: 'Query', paginatedVehicles: { __typename?: 'PaginatedVehicles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Vehicle', id: string, make: string, model: string, year: string, color: string, chassisNumber: string, numberPlate: string, maintenanceHistory?: string | null, avatar?: string | null, insurance: boolean, insuranceValidTill?: any | null, status: string, latitude?: number | null, longitude?: number | null, createdById: number, organizationId: number, createdAt: any, updatedAt: any, deletedAt?: any | null }> } };

export type DropdownRolesQueryVariables = Exact<{
  listInputDto: ListInputDto;
}>;


export type DropdownRolesQuery = { __typename?: 'Query', dropdownRoles: { __typename?: 'PaginatedRoles', meta: { __typename?: 'Meta', totalItems: number, totalPages: number, currentPage: number, limit: number }, data: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, roleType?: string | null, status: string, permissionCount: number }> } };


export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpRequestDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpRequestData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpRequestData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpGeneratedSuccessfully"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SendRegistrationOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendRegistrationOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendRegistrationOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"otpGeneratedSuccessfully"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendRegistrationOtpMutation, SendRegistrationOtpMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const HardDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteUserMutation, HardDeleteUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ChangeUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>;
export const RestoreUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreUserMutation, RestoreUserMutationVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const DeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const HardDeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteRoleMutation, HardDeleteRoleMutationVariables>;
export const RestoreRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreRoleMutation, RestoreRoleMutationVariables>;
export const ChangeRoleStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeRoleStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeRoleStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RoleArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeRoleStatusMutation, ChangeRoleStatusMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreatePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePermissionDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreatePermissionMutation, CreatePermissionMutationVariables>;
export const UpdatePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePermissionDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdatePermissionMutation, UpdatePermissionMutationVariables>;
export const DeletePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePermissionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePermissionId"}}}]}]}}]} as unknown as DocumentNode<DeletePermissionMutation, DeletePermissionMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const HardDeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteOrganizationMutation, HardDeleteOrganizationMutationVariables>;
export const RestoreOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreOrganizationMutation, RestoreOrganizationMutationVariables>;
export const ListTrashedOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedOrganizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedOrganizationsQuery, ListTrashedOrganizationsQueryVariables>;
export const EnableOrganizationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableOrganizationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableOrganizationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EnableOrganizationStatusMutation, EnableOrganizationStatusMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EnableProjectStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableProjectStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableProjectStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EnableProjectStatusMutation, EnableProjectStatusMutationVariables>;
export const CreateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateModuleMutation, CreateModuleMutationVariables>;
export const UpdateModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateModuleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const DeleteModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const HardDeleteModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteModuleMutation, HardDeleteModuleMutationVariables>;
export const RestoreModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreModuleMutation, RestoreModuleMutationVariables>;
export const ChangeModuleStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeModuleStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModuleStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeModuleStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateModuleStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateModuleStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ApplicationModule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ApplicationModuleArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeModuleStatusMutation, ChangeModuleStatusMutationVariables>;
export const TrashedModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedModulesQuery, TrashedModulesQueryVariables>;
export const CreateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}}]}}]} as unknown as DocumentNode<CreateCouponMutation, CreateCouponMutationVariables>;
export const UpdateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCouponDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdateCouponMutation, UpdateCouponMutationVariables>;
export const DeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteCouponMutation, DeleteCouponMutationVariables>;
export const HardDeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteCouponMutation, HardDeleteCouponMutationVariables>;
export const RestoreCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreCouponMutation, RestoreCouponMutationVariables>;
export const ChangeCouponStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCouponStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CouponStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeCouponStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCouponStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCouponStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coupon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CouponArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeCouponStatusMutation, ChangeCouponStatusMutationVariables>;
export const CreateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOfferInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOfferDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOfferInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreateOfferMutation, CreateOfferMutationVariables>;
export const UpdateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOfferDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOfferInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdateOfferMutation, UpdateOfferMutationVariables>;
export const DeleteOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const HardDeleteOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeleteOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeleteOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeleteOfferMutation, HardDeleteOfferMutationVariables>;
export const ChangeOfferStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeOfferStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeOfferStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOfferStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOfferStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Offer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OfferArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeOfferStatusMutation, ChangeOfferStatusMutationVariables>;
export const RestoreOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestoreOfferMutation, RestoreOfferMutationVariables>;
export const CreatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePackageMutation, CreatePackageMutationVariables>;
export const UpdatePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePackageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePackageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const DeletePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeletePackageMutation, DeletePackageMutationVariables>;
export const RestorePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestorePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restorePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestorePackageMutation, RestorePackageMutationVariables>;
export const HardDeletePackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeletePackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeletePackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeletePackageMutation, HardDeletePackageMutationVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const HardDeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HardDeletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hardDeletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<HardDeletePlanMutation, HardDeletePlanMutationVariables>;
export const RestorePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestorePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restorePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RestorePlanMutation, RestorePlanMutationVariables>;
export const ChangePlanStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePlanStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePlanStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangePlanStatusMutation, ChangePlanStatusMutationVariables>;
export const ApplyCouponToPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyCouponToPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"couponCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyCouponToPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"Argument","name":{"kind":"Name","value":"couponCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"couponCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}}]}}]}}]} as unknown as DocumentNode<ApplyCouponToPlanMutation, ApplyCouponToPlanMutationVariables>;
export const CreateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubscriptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubscriptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubscriptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const UpdateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubscriptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubscriptionDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSubscriptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubscriptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>;
export const DeleteSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;
export const ChangeSubscriptionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeSubscriptionStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubscriptionStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeSubscriptionStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSubscriptionStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubscriptionStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subscriptions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionsArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeSubscriptionStatusMutation, ChangeSubscriptionStatusMutationVariables>;
export const CreateMultipleOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMultipleOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMultipleOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMultipleOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateMultipleOrderMutation, CreateMultipleOrderMutationVariables>;
export const VerifyPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyPaymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}}]}}]}}]} as unknown as DocumentNode<VerifyPaymentMutation, VerifyPaymentMutationVariables>;
export const DeleteMetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteMetingMutation, DeleteMetingMutationVariables>;
export const CreateMeetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMeetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingTypeDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingTypeMutation, CreateMeetingTypeMutationVariables>;
export const UpdateMeetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingTypeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeetingTypeDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateMeetingTypeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingTypeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateMeetingTypeMutation, UpdateMeetingTypeMutationVariables>;
export const DeleteMetingVenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMetingVenue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMetingVenue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteMetingVenueMutation, DeleteMetingVenueMutationVariables>;
export const CreateMeetingVenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMeetingVenue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingVenueDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeetingVenue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contactPerson"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingVenueMutation, CreateMeetingVenueMutationVariables>;
export const UpdateMeetingVenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeetingVenue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingVenueInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeetingVenueDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeetingVenue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateMeetingVenueInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingVenueInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contactPerson"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateMeetingVenueMutation, UpdateMeetingVenueMutationVariables>;
export const CreateMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const UpdateMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeetingDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateMeetingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMeetingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}}]}}]}}]} as unknown as DocumentNode<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const DeleteNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteNotesMutation, DeleteNotesMutationVariables>;
export const CreateNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notesData"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNotesDto"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notesData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notesData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}}]}}]}}]} as unknown as DocumentNode<CreateNotesMutation, CreateNotesMutationVariables>;
export const DeleteMetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteMetingTaskMutation, DeleteMetingTaskMutationVariables>;
export const CreateMeetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMeetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingTaskDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskComplete"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingTaskMutation, CreateMeetingTaskMutationVariables>;
export const CreateFollowUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFollowUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFollowUpDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFollowUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}}]}}]}}]} as unknown as DocumentNode<CreateFollowUpMutation, CreateFollowUpMutationVariables>;
export const CreateNotePadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNotePad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notesData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNotePadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotePad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notesData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notesData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notesField"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateNotePadMutation, CreateNotePadMutationVariables>;
export const DeleteNotePadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotePad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotePad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteNotePadMutation, DeleteNotePadMutationVariables>;
export const UpdateNotePadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNotePad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateNotesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateNotePadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNotePad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateNotesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateNotesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notesField"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateNotePadMutation, UpdateNotePadMutationVariables>;
export const ChangePackageStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePackageStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PackageStatusDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePackageStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePackageStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePackageStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Package"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PackageArray"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangePackageStatusMutation, ChangePackageStatusMutationVariables>;
export const PaginatedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedRolesQuery, PaginatedRolesQueryVariables>;
export const ListTrashedRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedRolesQuery, ListTrashedRolesQueryVariables>;
export const FindRoleByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRoleById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findRoleByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRoleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findRoleByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<FindRoleByIdQuery, FindRoleByIdQueryVariables>;
export const PaginatedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedUsersQuery, PaginatedUsersQueryVariables>;
export const AllPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPermissionsQuery, AllPermissionsQueryVariables>;
export const PaginatedPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPermissionsQuery, PaginatedPermissionsQueryVariables>;
export const PaginatedOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOrganizationQuery, PaginatedOrganizationQueryVariables>;
export const PaginatedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedProjectsQuery, PaginatedProjectsQueryVariables>;
export const ListTrashedProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListTrashedProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTrashedProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<ListTrashedProjectsQuery, ListTrashedProjectsQueryVariables>;
export const FindPermissionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPermissionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"module"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<FindPermissionByIdQuery, FindPermissionByIdQueryVariables>;
export const FindPermsissonByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPermsissonByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}}}]}]}}]} as unknown as DocumentNode<FindPermsissonByUserIdQuery, FindPermsissonByUserIdQueryVariables>;
export const DashboardCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCount"}},{"kind":"Field","name":{"kind":"Name","value":"roleCount"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}},{"kind":"Field","name":{"kind":"Name","value":"projectCount"}},{"kind":"Field","name":{"kind":"Name","value":"organizationCount"}},{"kind":"Field","name":{"kind":"Name","value":"assignedPermissionCount"}}]}}]}}]} as unknown as DocumentNode<DashboardCountQuery, DashboardCountQueryVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findUserByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const UserHierarchyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserHierarchy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userHierarchy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"nameFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"subordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<UserHierarchyQuery, UserHierarchyQueryVariables>;
export const PaginatedModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedModulesQuery, PaginatedModulesQueryVariables>;
export const PaginatedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedCouponsQuery, PaginatedCouponsQueryVariables>;
export const TrashedCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"minOrderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedCouponsQuery, TrashedCouponsQueryVariables>;
export const CouponsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CouponsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponsDropdown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<CouponsDropdownQuery, CouponsDropdownQueryVariables>;
export const PaginatedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedOffersQuery, PaginatedOffersQueryVariables>;
export const TrashedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedOffersQuery, TrashedOffersQueryVariables>;
export const DropdownOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"usageLimit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]}}]} as unknown as DocumentNode<DropdownOffersQuery, DropdownOffersQueryVariables>;
export const PaginatedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"offerType"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPackagesQuery, PaginatedPackagesQueryVariables>;
export const TrashedPackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedPackages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedPackages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedPackagesQuery, TrashedPackagesQueryVariables>;
export const FindPackageByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPackageById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPackageByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPackageById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPackageByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"offerExpiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"offerDescription"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FindPackageByIdQuery, FindPackageByIdQueryVariables>;
export const PackagesDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PackagesDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packagesDropdown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<PackagesDropdownQuery, PackagesDropdownQueryVariables>;
export const PaginatedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPlansQuery, PaginatedPlansQueryVariables>;
export const TrashedPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedPlansQuery, TrashedPlansQueryVariables>;
export const PaginatedPlansForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedPlansForList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedPlansForList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedPlansForListQuery, PaginatedPlansForListQueryVariables>;
export const FindPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPlanByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPlanByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}}]}}]}}]} as unknown as DocumentNode<FindPlanByIdQuery, FindPlanByIdQueryVariables>;
export const PaginatedSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedSubscriptionsQuery, PaginatedSubscriptionsQueryVariables>;
export const TrashedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TrashedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trashedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobileNo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TrashedUsersQuery, TrashedUsersQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findPermissionsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findPermissionsByUserId"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetAllDynamicPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDynamicPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllDynamicPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentJson"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDynamicPageQuery, GetAllDynamicPageQueryVariables>;
export const PaginatedMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDoc"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingQuery, PaginatedMeetingQueryVariables>;
export const GetAllMeetingTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllMeetingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMeetingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllMeetingTypesQuery, GetAllMeetingTypesQueryVariables>;
export const PaginatedMeetingVenueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingVenue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingVenue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contactPerson"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingVenueQuery, PaginatedMeetingVenueQueryVariables>;
export const PaginatedMeetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingTypeQuery, PaginatedMeetingTypeQueryVariables>;
export const DeleteMetingTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMetingType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMetingType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteMetingTypeMutation, DeleteMetingTypeMutationVariables>;
export const PaginatedNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedNotesQuery, PaginatedNotesQueryVariables>;
export const GetUpcomingMeetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUpcomingMeetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUpcomingMeetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]}}]} as unknown as DocumentNode<GetUpcomingMeetingTaskQuery, GetUpcomingMeetingTaskQueryVariables>;
export const PaginatedMeetingTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedMeetingTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedMeetingTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"notesId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"parentTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"task"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"openedDate"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"completedDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completePercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalTaskComplete"}},{"kind":"Field","name":{"kind":"Name","value":"weightType"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedMeetingTaskQuery, PaginatedMeetingTaskQueryVariables>;
export const PaginatedNotePadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedNotePad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedNotePad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"notesField"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedNotePadQuery, PaginatedNotePadQueryVariables>;
export const GetUpcomingMeetingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUpcomingMeetings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUpcomingMeetings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingReference"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingVenueId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"parentMeetingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingAgenda"}},{"kind":"Field","name":{"kind":"Name","value":"meetingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"attendees"}}]}}]}}]}}]} as unknown as DocumentNode<GetUpcomingMeetingsQuery, GetUpcomingMeetingsQueryVariables>;
export const GetMeetingDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeetingDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMeetingDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"activeMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"inactiveMeetings"}},{"kind":"Field","name":{"kind":"Name","value":"upComingMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"completedMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"todayMeeting"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"inComingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"ongoingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"completedTasks"}}]}}]}}]} as unknown as DocumentNode<GetMeetingDashboardQuery, GetMeetingDashboardQueryVariables>;
export const PaginatedVehiclesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedVehicles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedVehicles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"chassisNumber"}},{"kind":"Field","name":{"kind":"Name","value":"numberPlate"}},{"kind":"Field","name":{"kind":"Name","value":"maintenanceHistory"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"insurance"}},{"kind":"Field","name":{"kind":"Name","value":"insuranceValidTill"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PaginatedVehiclesQuery, PaginatedVehiclesQueryVariables>;
export const DropdownRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DropdownRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListInputDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropdownRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListInputDTO"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listInputDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roleType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"permissionCount"}}]}}]}}]}}]} as unknown as DocumentNode<DropdownRolesQuery, DropdownRolesQueryVariables>;