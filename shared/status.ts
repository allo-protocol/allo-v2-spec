const statusEnum = [
  "None",
  "Pending",
  "Accepted",
  "Rejected",
  "Appealed",
  "InReview",
  "Canceled"
];

export function getStatusFromInt(statusInt: number) {  
    return statusEnum[statusInt];
}