const statusEnum = [
  "None",
  "Pending",
  "Accepted",
  "Rejected",
  "Appealed",
  "InReview",
  "Canceled",
  "Deleted"
];

export function getStatusFromInt(statusInt: number) {  
    return statusEnum[statusInt];
}