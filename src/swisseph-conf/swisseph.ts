import swep from "swisseph";

swep.swe_set_ephe_path("../swisseph-files");
swep.swe_set_sid_mode(swep.SE_SIDM_LAHIRI, 0, 0);

export default swep;