import { useState, useEffect, useRef } from "react";

// ── BASE DE DONNÉES INITIALE ─────────────────────────────────────────────────
const INITIAL_DB = {
  systemes: [
    {
      id: "aws75cc",
      nom: "AWS 75 CC",
      marque: "Schüco",
      famille: "Fenêtre",
      dta: "6/16-2290_V3",
      validite: "31/01/2026",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 130,
      tests: [
        {
          rapport: "BEB2.C.6053-1",
          type_chassis: "Oscillo-battant / Fixe sur allège",
          dim_L: 1250,
          dim_H: 2500,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "8mm + 4/18/4",     rw: 36, rwc: 35, rwctr: 32 },
            { composition: "8mm + 4/18/44.2S",  rw: 39, rwc: 38, rwctr: 34 },
            { composition: "8mm + 10/12/44.2S", rw: 42, rwc: 41, rwctr: 38 },
          ],
        },
        {
          rapport: "BEB2.C.6053-2",
          type_chassis: "Grand ouvrant / Fixe à la française",
          dim_L: 1250,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "8mm + 4/18/4",    rw: 37, rwc: 36, rwctr: 33 },
            { composition: "8mm + 4/16/6",    rw: 39, rwc: 37, rwctr: 34 },
            { composition: "8mm + 4/18/44.2S", rw: 40, rwc: 39, rwctr: 35 },
          ],
        },
      ],
      thermique: [
        { ug: 0.8, config: "Fenêtre 1 vantail 1.25x1.48", uw: 1.3 },
        { ug: 0.8, config: "Porte-fenêtre 1 vantail 1.25x2.18", uw: 1.2 },
        { ug: 0.8, config: "Fenêtre 2 vantaux 1.53x1.48", uw: 1.4 },
        { ug: 0.8, config: "Porte-fenêtre 2 vantaux 1.53x2.18", uw: 1.3 },
        { ug: 0.9, config: "Fenêtre 1 vantail 1.25x1.48", uw: 1.4 },
        { ug: 0.9, config: "Porte-fenêtre 1 vantail 1.25x2.18", uw: 1.3 },
        { ug: 0.9, config: "Fenêtre 2 vantaux 1.53x1.48", uw: 1.5 },
        { ug: 0.9, config: "Porte-fenêtre 2 vantaux 1.53x2.18", uw: 1.4 },
      ],
    },
    {
      id: "aws75ii",
      nom: "AWS 75.II",
      marque: "Schüco",
      famille: "Fenêtre",
      dta: "6/14-2206_V2",
      validite: "31/01/2028",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 150,
      tests: [
        {
          rapport: "BEB2.E.6077-1",
          type_chassis: "Fenêtre 1 vantail OB",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2015",
          vitrages: [
            { composition: "4/20/4",         rw: 32, rwc: 31, rwctr: 28 },
            { composition: "10/16/44.2 sil", rw: 43, rwc: 41, rwctr: 38 },
          ],
        },
        {
          rapport: "16131740/1.1.0",
          type_chassis: "Fenêtre 1 vantail OB (oscillo-battant)",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2006",
          vitrages: [
            { composition: "6/16/4",              rw: 37, rwc: 36, rwctr: 32 },
            { composition: "10/20/4",             rw: 39, rwc: 37, rwctr: 34 },
            { composition: "44.2 sil/20/6",       rw: 42, rwc: 40, rwctr: 37 },
            { composition: "86.2 sil/24/44.2 sil",rw: 48, rwc: 46, rwctr: 43 },
          ],
        },
        {
          rapport: "BEB2.E.6077-2",
          type_chassis: "Porte-fenêtre 2 vantaux",
          dim_L: 2180,
          dim_H: 1450,
          labo: "GINGER CEBTP",
          date: "2015",
          vitrages: [
            { composition: "4/18/6",          rw: 36, rwc: 34, rwctr: 31 },
            { composition: "6/18/10",         rw: 39, rwc: 37, rwctr: 35 },
            { composition: "10/16/44.2 sil",  rw: 43, rwc: 42, rwctr: 38 },
          ],
        },
      ],
      thermique: [
        { ug: 1.1, config: "Fenêtre 1 vantail Thi1 1.25x1.48", uw: 1.8 },
        { ug: 1.1, config: "Fenêtre 1 vantail Thi2 1.25x1.48", uw: 1.6 },
        { ug: 1.1, config: "Fenêtre 1 vantail Thi3 1.25x1.48", uw: 1.5 },
        { ug: 1.1, config: "Fenêtre 1 vantail Thi4 1.25x1.48", uw: 1.5 },
        { ug: 1.1, config: "Porte-fenêtre 1 vantail Thi1 1.25x2.18", uw: 1.7 },
        { ug: 1.1, config: "Porte-fenêtre 1 vantail Thi2 1.25x2.18", uw: 1.5 },
        { ug: 1.1, config: "Porte-fenêtre 1 vantail Thi3 1.25x2.18", uw: 1.4 },
        { ug: 1.1, config: "Porte-fenêtre 1 vantail Thi4 1.25x2.18", uw: 1.4 },
      ],
      aev: [
        { chassis: "Porte-fenêtre 2 vantaux fixe latéral", dims: "2959x2250", A: "3", E: "E8A", V: "C2", rapport: "BEB1.D.5004-3", date: "2013" },
        { chassis: "Porte-fenêtre 2 vantaux", dims: "1600x2250", A: "4", E: "E9A", V: "C3", rapport: "BEB1.D.5004-4", date: "2013" },
        { chassis: "Fenêtre 1 vantail OB", dims: "1350x1600", A: "4", E: "E9A", V: "C2", rapport: "BEB1.D.5004-6", date: "2013" },
        { chassis: "Fenêtre 1 vantail OF", dims: "1280x1543", A: "4", E: "9A", V: "C3", rapport: "AEV 06.17", date: "2017" },
        { chassis: "Fenêtre 1 vantail anglaise", dims: "1000x2200", A: "4", E: "9A", V: "C2", rapport: "BEB1.K.5009-20", date: "2020" },
        { chassis: "Fenêtre 1 vantail italienne", dims: "1600x2000", A: "4", E: "9A", V: "C3", rapport: "BEB1.K.5009-21", date: "2020" },
      ],
    },

    {
      id: "aws75bd",
      nom: "AWS 75 BD",
      marque: "Schüco",
      famille: "Porte-fenêtre",
      dta: "6/14-2206_V2",
      validite: "31/01/2028",
      epaisseur_min: 24,
      epaisseur_max: 50,
      poids_max: 130,
      tests: [
        {
          rapport: "BEB2.E.6055-1",
          type_chassis: "Porte-fenêtre 1 vantail",
          dim_L: 960,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2014",
          vitrages: [
            { composition: "4/20/4",         rw: 32, rwc: 31, rwctr: 28 },
            { composition: "4/20/6",         rw: 36, rwc: 35, rwctr: 32 },
            { composition: "6/20/44.2 sil",  rw: 41, rwc: 40, rwctr: 36 },
            { composition: "10/16/44.2 sil", rw: 42, rwc: 41, rwctr: 37 },
          ],
        },
        {
          rapport: "BEB2.E.6078-1",
          type_chassis: "Porte-fenêtre 2 vantaux",
          dim_L: 1450,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2015",
          vitrages: [
            { composition: "4/18/6",         rw: 36, rwc: 34, rwctr: 31 },
            { composition: "6/18/10",        rw: 39, rwc: 38, rwctr: 36 },
            { composition: "10/16/44.2 sil", rw: 43, rwc: 42, rwctr: 38 },
          ],
        },
        {
          rapport: "404-15-190",
          type_chassis: "Porte-fenêtre 1 vantail sur allège vitrée",
          dim_L: 1100,
          dim_H: 1925,
          labo: "FCBA",
          date: "2015",
          vitrages: [
            { composition: "44.2/16/10",             rw: 39, rwc: 38, rwctr: 36 },
            { composition: "44.2 Sonic/16/10",       rw: 43, rwc: 42, rwctr: 39 },
            { composition: "66.2 Sonic/20/44.2 Sonic", rw: 45, rwc: 44, rwctr: 41 },
          ],
        },
        {
          rapport: "404-18-271",
          type_chassis: "Porte-fenêtre 1 vantail",
          dim_L: 950,
          dim_H: 2350,
          labo: "FCBA",
          date: "2018",
          vitrages: [
            { composition: "4/20/4",          rw: 34, rwc: 32, rwctr: 29 },
            { composition: "6/20/44.2s",      rw: 43, rwc: 41, rwctr: 37 },
            { composition: "86.2s/24/64.2s",  rw: 47, rwc: 45, rwctr: 41 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "aws60",
      nom: "AWS 60",
      marque: "Schüco",
      famille: "Fenêtre",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 130,
      tests: [
        {
          rapport: "BEB2.8.6028-2",
          type_chassis: "Fenêtre 2 vantaux OF",
          dim_L: 1450,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2008",
          vitrages: [
            { composition: "4/16/4",        rw: 33, rwc: 32, rwctr: 29 },
            { composition: "4/20/6",        rw: 38, rwc: 36, rwctr: 32 },
            { composition: "4/16/10",       rw: 38, rwc: 37, rwctr: 34 },
            { composition: "44.2s/20/10",   rw: 41, rwc: 40, rwctr: 36 },
          ],
        },
        {
          rapport: "ER109-06-0001-1",
          type_chassis: "Porte-fenêtre avec seuil PMR",
          dim_L: 1100,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2008",
          vitrages: [
            { composition: "4/16/4",        rw: 32, rwc: 30, rwctr: 28 },
            { composition: "4/16/10",       rw: 35, rwc: 34, rwctr: 31 },
            { composition: "44.1s/16/6",    rw: 34, rwc: 33, rwctr: 30 },
          ],
        },
        {
          rapport: "404/15/38/1-2-3",
          type_chassis: "Porte-fenêtre 1 vantail",
          dim_L: 900,
          dim_H: 2170,
          labo: "FCBA",
          date: "2015",
          vitrages: [
            { composition: "44.2s/16/6",    rw: 39, rwc: 37, rwctr: 34 },
            { composition: "44.2s/16/8",    rw: 39, rwc: 38, rwctr: 35 },
            { composition: "44.2s/16/10",   rw: 40, rwc: 39, rwctr: 36 },
          ],
        },
        {
          rapport: "BEB2.8.6028-1",
          type_chassis: "Porte-fenêtre 2 vantaux OF",
          dim_L: 1450,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2008",
          vitrages: [
            { composition: "4/16/4",        rw: 33, rwc: 31, rwctr: 28 },
            { composition: "4/20/6",        rw: 37, rwc: 36, rwctr: 33 },
            { composition: "4/16/10",       rw: 39, rwc: 38, rwctr: 34 },
            { composition: "44.2s/20/10",   rw: 43, rwc: 41, rwctr: 38 },
          ],
        },
        {
          rapport: "BEB2.8.6034-2",
          type_chassis: "Porte-fenêtre SCP",
          dim_L: 1850,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2008",
          vitrages: [
            { composition: "4/16/4",        rw: 32, rwc: 31, rwctr: 28 },
            { composition: "4/20/6",        rw: 37, rwc: 35, rwctr: 32 },
            { composition: "4/20/10",       rw: 38, rwc: 37, rwctr: 34 },
            { composition: "44.2s/20/10",   rw: 42, rwc: 41, rwctr: 38 },
          ],
        },
        {
          rapport: "16131740/1-2-3 + 16131811 + 16138172",
          type_chassis: "Fenêtre 1 vantail OF",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2006",
          vitrages: [
            { composition: "6/16/4",                 rw: 37, rwc: 36, rwctr: 33 },
            { composition: "44.2s/20/6",             rw: 42, rwc: 40, rwctr: 36 },
            { composition: "44.2s/24/10",            rw: 45, rwc: 43, rwctr: 41 },
            { composition: "8/24/44.2 sil (ital.)",  rw: 44, rwc: 42, rwctr: 40 },
            { composition: "66.2 sil/20/44.2 sil",   rw: 46, rwc: 45, rwctr: 42 },
          ],
        },
        {
          rapport: "404/11/78",
          type_chassis: "Fenêtre basculant",
          dim_L: 1600,
          dim_H: 1300,
          labo: "FCBA",
          date: "2012",
          vitrages: [
            { composition: "4/16/10",        rw: 38, rwc: 37, rwctr: 34 },
            { composition: "4/16/44.2 sil",  rw: 40, rwc: 38, rwctr: 35 },
            { composition: "6/16/44.2 sil",  rw: 40, rwc: 39, rwctr: 36 },
          ],
        },
        {
          rapport: "AC20-26086140-4/5/6/7/8",
          type_chassis: "Fenêtre 1 vantail OB",
          dim_L: 1480,
          dim_H: 1230,
          labo: "CSTB",
          date: "2020",
          vitrages: [
            { composition: "4/20/4",         rw: 32, rwc: 30, rwctr: 27 },
            { composition: "4/16/10",        rw: 37, rwc: 36, rwctr: 32 },
            { composition: "6/16/10",        rw: 38, rwc: 37, rwctr: 34 },
            { composition: "6/16/44.2s",     rw: 41, rwc: 38, rwctr: 34 },
            { composition: "44.2s/16/10",    rw: 40, rwc: 39, rwctr: 36 },
            { composition: "64.2s/24/10",    rw: 45, rwc: 44, rwctr: 42 },
            { composition: "66.2s/24/10",    rw: 45, rwc: 44, rwctr: 43 },
            { composition: "86.2s/24/10",    rw: 44, rwc: 43, rwctr: 42 },
          ],
        },
      ],
      thermique: [],
      aev: [
        { chassis: "Fenêtre 1 vtl + OB 2 vtx ferrure cachée", dims: "1800x1850", A: "4", E: "9A", V: "A3", rapport: "ALU 20.08", date: "2008" },
        { chassis: "Porte-fenêtre 1 vtl OF seuil PMR", dims: "1100x2180", A: "4", E: "7B", V: "A2", rapport: "ALU 23.08", date: "2008" },
        { chassis: "Porte-fenêtre 1 vtl OB 130kg", dims: "1300x2180", A: "4", E: "9A", V: "A3", rapport: "ALU 26.08", date: "2008" },
        { chassis: "Porte-fenêtre 2 vtx OB PMR", dims: "1450x2180", A: "4", E: "7B", V: "C2", rapport: "BV08-583", date: "2008" },
        { chassis: "Porte-fenêtre 2 vtx + fixe paumelles", dims: "3300x2180", A: "4", E: "9A", V: "C2", rapport: "BV-08-1035", date: "2008" },
        { chassis: "Fenêtre 1 vtl OF ferrure cachée", dims: "1350x1500", A: "4", E: "9A", V: "C3", rapport: "BV-08-1347", date: "2008" },
        { chassis: "Fenêtre OB ferrure cachée", dims: "1450x1800", A: "4", E: "6A", V: "A2", rapport: "BV-08-1036", date: "2008" },
        { chassis: "Fenêtre SCP", dims: "1850x2180", A: "4", E: "8A", V: "C2", rapport: "BEB1-A-5000-8", date: "2010" },
        { chassis: "Fenêtre 1 vtl", dims: "1300x1500", A: "4", E: "9A", V: "C4", rapport: "ALU 40.11", date: "2011" },
        { chassis: "Porte-fenêtre anglaise", dims: "1100x2200", A: "4", E: "9A", V: "A3", rapport: "ALU 04.09", date: "2009" },
      ],
    }
    ,
    {
      id: "aws60bg",
      nom: "AWS 60 BG",
      marque: "Schüco",
      famille: "Fenêtre",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 44,
      poids_max: 130,
      tests: [
        {
          rapport: "AC09-26019857/5",
          type_chassis: "Fenêtre 1 vantail",
          dim_L: 1280,
          dim_H: 1530,
          labo: "CSTB",
          date: "2009",
          vitrages: [
            { composition: "4/20/6",         rw: 37, rwc: 35, rwctr: 31 },
            { composition: "44.2 sil/12/10",  rw: 43, rwc: 41, rwctr: 38 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "aws60bd",
      nom: "AWS 60 BD",
      marque: "Schüco",
      famille: "Fenêtre",
      dta: "6/16-2343_V2",
      validite: "30/09/2025",
      epaisseur_min: 24,
      epaisseur_max: 44,
      poids_max: 130,
      tests: [
        {
          rapport: "AC09-26019857/3",
          type_chassis: "Fenêtre OF 1 vantail",
          dim_L: 1280,
          dim_H: 1530,
          labo: "CSTB",
          date: "2009",
          vitrages: [
            { composition: "4/18/6",          rw: 36, rwc: 34, rwctr: 31 },
            { composition: "4/18/10",         rw: 38, rwc: 36, rwctr: 32 },
            { composition: "44.2 sil/20/10",  rw: 43, rwc: 42, rwctr: 39 },
          ],
          aev: [],
        },
        {
          rapport: "AC09-26019857/4",
          type_chassis: "Fenêtre OF 2 vantaux",
          dim_L: 1450,
          dim_H: 1480,
          labo: "CSTB",
          date: "2009",
          vitrages: [
            { composition: "4/18/6",          rw: 37, rwc: 35, rwctr: 31 },
            { composition: "4/18/10",         rw: 38, rwc: 37, rwctr: 33 },
            { composition: "44.2 sil/20/10",  rw: 42, rwc: 41, rwctr: 38 },
          ],
          aev: [],
        },
        {
          rapport: "404/19/160/1",
          type_chassis: "Porte-fenêtre OF 2 vantaux",
          dim_L: 1470,
          dim_H: 2177,
          labo: "FCBA",
          date: "2019",
          vitrages: [
            { composition: "4/16/44.2 Sil",   rw: 39, rwc: 37, rwctr: 33 },
          ],
          aev: [],
        },
        {
          rapport: "AC20-26086140-1/2/3",
          type_chassis: "Fenêtre OB 1 vantail",
          dim_L: 1436,
          dim_H: 1186,
          labo: "CSTB",
          date: "2020",
          vitrages: [
            { composition: "4/16/10",         rw: 38, rwc: 37, rwctr: 33 },
            { composition: "6/16/10",         rw: 38, rwc: 37, rwctr: 35 },
            { composition: "6/16/44.2s",      rw: 41, rwc: 38, rwctr: 34 },
          ],
          aev: [],
        },
      ],
      aev: [
        { chassis: "Fenêtre 1 vantail", dims: "1250x1400", A: "4", E: "E750", V: "3", rapport: "ALU 23.09", date: "2009" },
        { chassis: "Fenêtre 2 vantaux", dims: "1800x1400", A: "4", E: "E900", V: "2", rapport: "ALU 25.09", date: "2009" },
        { chassis: "Porte-fenêtre 2 vantaux", dims: "2000x2180", A: "4", E: "9A", V: "2", rapport: "ALU 26.09", date: "2009" },
        { chassis: "Porte-fenêtre 1 vantail", dims: "1400x2180", A: "4", E: "9A", V: "3", rapport: "ALU 27.09", date: "2009" },
        { chassis: "Porte-fenêtre 2 vantaux", dims: "2000x2180", A: "4", E: "9A", V: "C2", rapport: "BEB1-A-5000-9", date: "2010" },
        { chassis: "Fenêtre 1 vantail (Thi1 NG)", dims: "1250x1400", A: "4", E: "E9A", V: "C3", rapport: "BEB1.C.5007-7/2", date: "2013" },
        { chassis: "OF 1 vantail", dims: "1350x1800", A: "4", E: "7A", V: "C5", rapport: "AEV 08.19", date: "2019" },
      ],
      thermique: [],
    }
    ,
    {
      id: "fws50",
      nom: "FWS 50",
      marque: "Schüco",
      famille: "Façade",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 60,
      poids_max: 250,
      tests: [
        {
          rapport: "160 21404/1.0.0-1",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2003",
          vitrages: [
            { composition: "6/16/4",  rw: 35, rwc: 33, rwctr: 31 },
          ],
        },
        {
          rapport: "160 21404/3.0.0-1",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2003",
          vitrages: [
            { composition: "4/20/12", rw: 39, rwc: 37, rwctr: 36 },
          ],
        },
        {
          rapport: "BEB2.H.6068-4",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2017",
          vitrages: [
            { composition: "6/20/44.2 silence",  rw: 41, rwc: 40, rwctr: 37 },
            { composition: "10/10/44.2 silence", rw: 43, rwc: 42, rwctr: 40 },
          ],
        },
        {
          rapport: "BEB2.D.6033-2",
          type_chassis: "Ouvrant italienne / HOI",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "44.2/20/66.2 (OI)",  rw: 42, rwc: 41, rwctr: 39 },
            { composition: "44.2/20/66.2 (HOI)", rw: 45, rwc: 44, rwctr: 41 },
          ],
        },
        {
          rapport: "BEB2.D.6033-1",
          type_chassis: "Ouvrant OB",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "44.2 sil/24/55.2 sil", rw: 46, rwc: 45, rwctr: 42 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "fws60",
      nom: "FWS 60",
      marque: "Schüco",
      famille: "Façade",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 60,
      poids_max: 250,
      tests: [
        {
          rapport: "160 21404/1.0.0-1",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2003",
          vitrages: [
            { composition: "6/16/4",  rw: 35, rwc: 33, rwctr: 31 },
          ],
        },
        {
          rapport: "160 21404/3.0.0-1",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "IFT Rosenheim",
          date: "2003",
          vitrages: [
            { composition: "4/20/12", rw: 39, rwc: 37, rwctr: 36 },
          ],
        },
        {
          rapport: "BEB2.H.6068-4",
          type_chassis: "Fixe façade",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2017",
          vitrages: [
            { composition: "6/20/44.2 silence",  rw: 41, rwc: 40, rwctr: 37 },
            { composition: "10/10/44.2 silence", rw: 43, rwc: 42, rwctr: 40 },
          ],
        },
        {
          rapport: "BEB2.D.6033-2",
          type_chassis: "Ouvrant italienne / HOI",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "44.2/20/66.2 (OI)",  rw: 42, rwc: 41, rwctr: 39 },
            { composition: "44.2/20/66.2 (HOI)", rw: 45, rwc: 44, rwctr: 41 },
          ],
        },
        {
          rapport: "BEB2.D.6033-1",
          type_chassis: "Ouvrant OB",
          dim_L: 1230,
          dim_H: 1480,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "44.2 sil/24/55.2 sil", rw: 46, rwc: 45, rwctr: 42 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ads60ch",
      nom: "ADS 60 CH",
      marque: "Schüco",
      famille: "Porte",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 150,
      tests: [
        {
          rapport: "BEB2.C.6021-1",
          type_chassis: "Porte OF 1 vantail seuil PMR",
          dim_L: 960,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2012",
          vitrages: [
            { composition: "4/16/4",       rw: 34, rwc: 32, rwctr: 29 },
            { composition: "44.2S/16/4",   rw: 39, rwc: 38, rwctr: 35 },
          ],
        },
        {
          rapport: "BEB2.J.6080-1",
          type_chassis: "Porte OF 2 vantaux",
          dim_L: 2200,
          dim_H: 2500,
          labo: "GINGER CEBTP",
          date: "2020",
          vitrages: [
            { composition: "44.2 Ac/14/44.2 Ac", rw: 37, rwc: 36, rwctr: 34 },
          ],
        },
        {
          rapport: "BEB2.J.6080-2",
          type_chassis: "Porte OF 1 vantail",
          dim_L: 1200,
          dim_H: 2500,
          labo: "GINGER CEBTP",
          date: "2020",
          vitrages: [
            { composition: "10/12/44.2 Ac", rw: 41, rwc: 40, rwctr: 38 },
            { composition: "4/16/44.2 Ac",  rw: 39, rwc: 38, rwctr: 34 },
            { composition: "4/20/4",        rw: 33, rwc: 32, rwctr: 29 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ads60chhd",
      nom: "ADS 60 CH.HD",
      marque: "Schüco",
      famille: "Porte",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 150,
      tests: [
        {
          rapport: "BEB2.C.6021-1",
          type_chassis: "Porte OF 1 vantail seuil PMR",
          dim_L: 960,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2012",
          vitrages: [
            { composition: "4/16/4",       rw: 34, rwc: 32, rwctr: 29 },
            { composition: "44.2S/16/4",   rw: 39, rwc: 38, rwctr: 35 },
          ],
        },
        {
          rapport: "BEB2.J.6080-1",
          type_chassis: "Porte OF 2 vantaux",
          dim_L: 2200,
          dim_H: 2500,
          labo: "GINGER CEBTP",
          date: "2020",
          vitrages: [
            { composition: "44.2 Ac/14/44.2 Ac", rw: 37, rwc: 36, rwctr: 34 },
          ],
        },
        {
          rapport: "BEB2.J.6080-2",
          type_chassis: "Porte OF 1 vantail",
          dim_L: 1200,
          dim_H: 2500,
          labo: "GINGER CEBTP",
          date: "2020",
          vitrages: [
            { composition: "10/12/44.2 Ac", rw: 41, rwc: 40, rwctr: 38 },
            { composition: "4/16/44.2 Ac",  rw: 39, rwc: 38, rwctr: 34 },
            { composition: "4/20/4",        rw: 33, rwc: 32, rwctr: 29 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ass41sc",
      nom: "ASS 41 SC",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 48,
      poids_max: 150,
      tests: [
        {
          rapport: "AC15-26057348-Rév01",
          type_chassis: "Porte-fenêtre 2 vantaux coulissante",
          dim_L: 1850,
          dim_H: 2187,
          labo: "CSTB",
          date: "2017",
          vitrages: [
            { composition: "4/20/4",       rw: 31, rwc: 30, rwctr: 28 },
            { composition: "4/18/6",       rw: 34, rwc: 33, rwctr: 30 },
            { composition: "4/14/10",      rw: 35, rwc: 34, rwctr: 32 },
            { composition: "6/14/44.2s",   rw: 36, rwc: 35, rwctr: 33 },
            { composition: "10/10/44.2s",  rw: 38, rwc: 37, rwctr: 35 },
          ],
        },
        {
          rapport: "BEB2.H.6034-2",
          type_chassis: "Porte-fenêtre 1 vantail galandage",
          dim_L: 1400,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2017",
          vitrages: [
            { composition: "4/20/4",       rw: 31, rwc: 30, rwctr: 27 },
            { composition: "4/18/6",       rw: 33, rwc: 32, rwctr: 30 },
            { composition: "4/14/10",      rw: 33, rwc: 33, rwctr: 31 },
            { composition: "44.2/10/10",   rw: 34, rwc: 33, rwctr: 33 },
            { composition: "44.2/14/6",    rw: 34, rwc: 33, rwctr: 32 },
          ],
        },
        {
          rapport: "BEB2.H.6034-1",
          type_chassis: "Porte-fenêtre 2 vantaux galandage",
          dim_L: 2350,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2017",
          vitrages: [
            { composition: "4/20/4",       rw: 31, rwc: 30, rwctr: 27 },
            { composition: "4/18/6",       rw: 32, rwc: 32, rwctr: 30 },
            { composition: "4/14/10",      rw: 33, rwc: 32, rwctr: 31 },
            { composition: "44.2/14/6",    rw: 34, rwc: 33, rwctr: 32 },
            { composition: "10/10/44.2",   rw: 34, rwc: 33, rwctr: 33 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ass46sc",
      nom: "ASS 46 SC",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 50,
      poids_max: 150,
      tests: [
        {
          rapport: "BEB2.M.6008-1/2/3/4/5/6/7/8/9",
          type_chassis: "Porte-fenêtre 2 vantaux coulissante",
          dim_L: 2000,
          dim_H: 2300,
          labo: "GINGER CEBTP",
          date: "2022",
          vitrages: [
            { composition: "4/20/6",        rw: 35, rwc: 34, rwctr: 31 },
            { composition: "6/18/10",       rw: 36, rwc: 35, rwctr: 34 },
            { composition: "4/20/44.2",     rw: 37, rwc: 36, rwctr: 34 },
            { composition: "10/10/44.2",    rw: 38, rwc: 37, rwctr: 37 },
            { composition: "33.2/18/44.2",  rw: 38, rwc: 37, rwctr: 36 },
            { composition: "6/20/44.2",     rw: 38, rwc: 37, rwctr: 36 },
            { composition: "10/16/44.2",    rw: 38, rwc: 37, rwctr: 36 },
            { composition: "44.2/12/66.2",  rw: 39, rwc: 38, rwctr: 37 },
            { composition: "10/12/66.2",    rw: 40, rwc: 39, rwctr: 38 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ass50",
      nom: "ASS 50",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 20,
      epaisseur_max: 20,
      poids_max: 150,
      tests: [
        {
          rapport: "2312.6.777/8",
          type_chassis: "Porte-fenêtre 2 vantaux coulissante",
          dim_L: 2500,
          dim_H: 2100,
          labo: "GINGER CEBTP",
          date: "1997",
          vitrages: [
            { composition: "4/6/10", rw: 33, rwc: 34, rwctr: 31 },
          ],
        },
        {
          rapport: "2312.6.777/30",
          type_chassis: "Porte-fenêtre à lever 2 vantaux",
          dim_L: 2500,
          dim_H: 2100,
          labo: "GINGER CEBTP",
          date: "1997",
          vitrages: [
            { composition: "4/6/10", rw: 34, rwc: 34, rwctr: 31 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ass75fd",
      nom: "ASS 75 FD",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 26,
      epaisseur_max: 42,
      poids_max: 200,
      tests: [
        {
          rapport: "16119374/1.0.0-1.1.0-1.2.0",
          type_chassis: "Porte accordéon",
          dim_L: 2670,
          dim_H: 2430,
          labo: "IFT Rosenheim",
          date: "1997",
          vitrages: [
            { composition: "4/16/6",       rw: 35, rwc: 34, rwctr: 30 },
            { composition: "44.2/16/6",    rw: 40, rwc: 39, rwctr: 35 },
            { composition: "66.2/20/44.2", rw: 42, rwc: 41, rwctr: 38 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ase60",
      nom: "ASE 60",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 28,
      epaisseur_max: 55,
      poids_max: 200,
      tests: [
        {
          rapport: "BEB2.M.6064-1/2/3/4",
          type_chassis: "Porte-fenêtre 1 vantail à lever + 1 fixe",
          dim_L: 3600,
          dim_H: 2400,
          labo: "GINGER CEBTP",
          date: "2023",
          vitrages: [
            { composition: "6/20/10",       rw: 37, rwc: 35, rwctr: 34 },
            { composition: "10/20/44.2",    rw: 41, rwc: 40, rwctr: 38 },
            { composition: "8/20/55.2",     rw: 41, rwc: 40, rwctr: 38 },
            { composition: "64.2/18/44.2",  rw: 42, rwc: 41, rwctr: 38 },
          ],
        },
        {
          rapport: "BEB2.M.6064-5/6/7",
          type_chassis: "Porte-fenêtre 2 vantaux à lever",
          dim_L: 3600,
          dim_H: 2400,
          labo: "GINGER CEBTP",
          date: "2023",
          vitrages: [
            { composition: "6/20/10",       rw: 35, rwc: 34, rwctr: 33 },
            { composition: "10/20/44.2",    rw: 37, rwc: 36, rwctr: 35 },
            { composition: "64.2/18/44.2",  rw: 38, rwc: 37, rwctr: 36 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "ase80hi",
      nom: "ASE 80 HI",
      marque: "Schüco",
      famille: "Coulissant",
      dta: "",
      validite: "",
      epaisseur_min: 34,
      epaisseur_max: 58,
      poids_max: 200,
      tests: [
        {
          rapport: "BEB2.M.6002-1/2 + BEB2.M.6038-4",
          type_chassis: "Porte-fenêtre 2 vantaux coulissants à lever",
          dim_L: 3600,
          dim_H: 2400,
          labo: "GINGER CEBTP",
          date: "2023",
          vitrages: [
            { composition: "10/20/44.2",    rw: 37, rwc: 36, rwctr: 35 },
            { composition: "64.2/18/44.2",  rw: 39, rwc: 37, rwctr: 36 },
            { composition: "86.2/24/44.2",  rw: 39, rwc: 38, rwctr: 37 },
          ],
        },
        {
          rapport: "BEB2.M.6038-1/2/3",
          type_chassis: "Porte-fenêtre 1 vantail coulissant à lever + fixe",
          dim_L: 3600,
          dim_H: 2400,
          labo: "GINGER CEBTP",
          date: "2023",
          vitrages: [
            { composition: "10/20/44.2",    rw: 42, rwc: 40, rwctr: 38 },
            { composition: "64.2/18/44.2",  rw: 42, rwc: 41, rwctr: 39 },
            { composition: "86.2/24/44.2",  rw: 44, rwc: 42, rwctr: 40 },
          ],
        },
      ],
      thermique: [],
    }
    ,
    {
      id: "aws60dl",
      nom: "AWS 60 DL",
      marque: "Schüco",
      famille: "Porte",
      dta: "",
      validite: "",
      epaisseur_min: 24,
      epaisseur_max: 44,
      poids_max: 150,
      tests: [
        {
          rapport: "BEB2.C.6054-1",
          type_chassis: "Porte OF 1 vantail Isopano",
          dim_L: 960,
          dim_H: 2180,
          labo: "GINGER CEBTP",
          date: "2013",
          vitrages: [
            { composition: "Panneau 73", rw: 30, rwc: 30, rwctr: 28 },
          ],
          aev: [],
        },
      ],
      aev: [
        { chassis: "Porte OF 1 vantail Isopano", dims: "1024x2217", A: "3", E: "5B", V: "C2", rapport: "ALU 13.12", date: "2012" },
        { chassis: "Porte 1 vantail", dims: "1016x2304", A: "4", E: "9A", V: "A2", rapport: "ALU 09.10", date: "2010" },
        { chassis: "Porte 2 vantaux seuil PMR", dims: "1800x2250", A: "3", E: "6A", V: "C2", rapport: "BEB1.L.5003-13", date: "2021" },
      ],
      thermique: [],
    }
  ],
};


// ── BASE CAPAS ────────────────────────────────────────────────────────────────
const INITIAL_CONTROLES = [
  // ── SAINT-GOBAIN ──────────────────────────────────────────────────────────
  // COOL-LITE XTREME
  { id: "sg_xtreme_7033",   marque: "Saint-Gobain", gamme: "Cool-Lite Xtreme", ref: "Xtreme 70/33",    tl: 70, fs: 0.33, ug: 1.0, note: "Très haute sélectivité, neutre" },
  { id: "sg_xtreme_6129",   marque: "Saint-Gobain", gamme: "Cool-Lite Xtreme", ref: "Xtreme 61/29",    tl: 61, fs: 0.29, ug: 1.0, note: "Haute sélectivité" },
  { id: "sg_xtreme_5123",   marque: "Saint-Gobain", gamme: "Cool-Lite Xtreme", ref: "Xtreme 51/23",    tl: 51, fs: 0.23, ug: 1.0, note: "Très haute protection solaire" },
  { id: "sg_xtreme_5022",   marque: "Saint-Gobain", gamme: "Cool-Lite Xtreme", ref: "Xtreme 50/22 II", tl: 47, fs: 0.21, ug: 1.0, note: "Protection solaire maximale, trempé obligatoire" },
  // COOL-LITE SKN
  { id: "sg_skn183",        marque: "Saint-Gobain", gamme: "Cool-Lite SKN",    ref: "SKN 183",         tl: 76, fs: 0.38, ug: 1.0, note: "Haute TL, protection modérée" },
  { id: "sg_skn176",        marque: "Saint-Gobain", gamme: "Cool-Lite SKN",    ref: "SKN 176",         tl: 70, fs: 0.37, ug: 1.0, note: "Planistar Sun Plus" },
  { id: "sg_skn165",        marque: "Saint-Gobain", gamme: "Cool-Lite SKN",    ref: "SKN 165",         tl: 61, fs: 0.34, ug: 1.0, note: "Équilibre TL/protection" },
  { id: "sg_skn154",        marque: "Saint-Gobain", gamme: "Cool-Lite SKN",    ref: "SKN 154",         tl: 52, fs: 0.28, ug: 1.0, note: "Haute protection solaire" },
  { id: "sg_skn145",        marque: "Saint-Gobain", gamme: "Cool-Lite SKN",    ref: "SKN 145",         tl: 41, fs: 0.22, ug: 1.1, note: "Protection solaire max gamme SKN" },
  // PLANITHERM
  { id: "sg_planitherm_xn", marque: "Saint-Gobain", gamme: "Planitherm",       ref: "Planitherm XN",   tl: 82, fs: 0.63, ug: 1.1, note: "ITR, pas de contrôle solaire" },
  { id: "sg_planitherm_one",marque: "Saint-Gobain", gamme: "Planitherm",       ref: "Planitherm ONE",  tl: 80, fs: 0.60, ug: 1.0, note: "ITR haute performance" },

  // ── AGC ───────────────────────────────────────────────────────────────────
  // STOPRAY VISION
  { id: "agc_stopray_v70",   marque: "AGC", gamme: "Stopray Vision",    ref: "Stopray Vision 70/35",      tl: 70, fs: 0.35, ug: 1.0, note: "Haute TL, double couche argent, neutre" },
  { id: "agc_stopray_v62",   marque: "AGC", gamme: "Stopray Vision",    ref: "Stopray Vision 62/33",      tl: 62, fs: 0.33, ug: 1.0, note: "Bonne TL, haute protection solaire" },
  { id: "agc_stopray_v52",   marque: "AGC", gamme: "Stopray Vision",    ref: "Stopray Vision 52/27",      tl: 52, fs: 0.27, ug: 1.0, note: "Protection solaire élevée" },
  // STOPRAY NEUTRAL
  { id: "agc_stopray_n70",   marque: "AGC", gamme: "Stopray Neutral",   ref: "Stopray Neutral 70/35",     tl: 70, fs: 0.35, ug: 1.0, note: "Très neutre, double couche argent" },
  { id: "agc_stopray_n60",   marque: "AGC", gamme: "Stopray Neutral",   ref: "Stopray Neutral 60/33",     tl: 60, fs: 0.33, ug: 1.0, note: "Neutre, bonne protection solaire" },
  { id: "agc_stopray_n50",   marque: "AGC", gamme: "Stopray Neutral",   ref: "Stopray Neutral 50/27",     tl: 50, fs: 0.27, ug: 1.0, note: "Haute protection, très neutre" },
  // STOPRAY ULTRASELECT
  { id: "agc_stopray_us70",  marque: "AGC", gamme: "Stopray Ultraselect", ref: "Stopray Ultra-70 ClearVision", tl: 70, fs: 0.33, ug: 1.0, note: "Triple argent, sélectivité 2.12" },
  { id: "agc_stopray_us60",  marque: "AGC", gamme: "Stopray Ultraselect", ref: "Stopray Ultraselect 60/27",    tl: 60, fs: 0.27, ug: 1.0, note: "Triple argent, sélectivité 2.22" },
  { id: "agc_stopray_us50",  marque: "AGC", gamme: "Stopray Ultraselect", ref: "Stopray Ultra-50 ClearVision", tl: 50, fs: 0.27, ug: 1.0, note: "Triple argent, très haute protection" },
  // IPASOL
  { id: "agc_ipasol_n7037",  marque: "AGC", gamme: "Ipasol",            ref: "Ipasol neutral 70/37",      tl: 70, fs: 0.37, ug: 1.0, note: "Mesures fixes trempées, neutre" },
  { id: "agc_ipasol_lg6033", marque: "AGC", gamme: "Ipasol",            ref: "Ipasol light grey 60/33",   tl: 60, fs: 0.33, ug: 1.0, note: "Teinte grise légère, mesures fixes" },
  { id: "agc_ipasol_n4827",  marque: "AGC", gamme: "Ipasol",            ref: "Ipasol neutral 48/27",      tl: 48, fs: 0.27, ug: 1.0, note: "Haute protection, mesures fixes" },
  // ── GUARDIAN ──────────────────────────────────────────────────────────────
  // SUNGUARD SNX (eXtraSelective - triple argent)
  { id: "gu_snx70",    marque: "Guardian", gamme: "SunGuard SNX",         ref: "SunGuard SNX 70",      tl: 68, fs: 0.32, ug: 1.0, note: "Triple argent, sélectivité 2.12, neutre" },
  { id: "gu_snx60",    marque: "Guardian", gamme: "SunGuard SNX",         ref: "SunGuard SNX 60",      tl: 60, fs: 0.29, ug: 1.0, note: "Triple argent, haute sélectivité" },
  { id: "gu_snx6028",  marque: "Guardian", gamme: "SunGuard SNX",         ref: "SunGuard SNX 60/28 HT",tl: 60, fs: 0.28, ug: 1.0, note: "Triple argent, version trempée" },
  // SUNGUARD SUPERNEUTRAL (double argent)
  { id: "gu_sn63",     marque: "Guardian", gamme: "SunGuard SuperNeutral", ref: "SunGuard SN 63",       tl: 63, fs: 0.35, ug: 1.0, note: "Double argent, aspect neutre gris" },
  { id: "gu_sn51",     marque: "Guardian", gamme: "SunGuard SuperNeutral", ref: "SunGuard SN 51",       tl: 51, fs: 0.29, ug: 1.0, note: "Double argent, haute protection" },
  // SUNGUARD HD (haute définition)
  { id: "gu_hd6533",   marque: "Guardian", gamme: "SunGuard HD",          ref: "SunGuard HD 65/33",    tl: 65, fs: 0.33, ug: 1.0, note: "Haute définition, très neutre" },
  { id: "gu_hd5027",   marque: "Guardian", gamme: "SunGuard HD",          ref: "SunGuard HD 50/27",    tl: 50, fs: 0.27, ug: 1.0, note: "Haute protection, neutre" },
];

function getControles() {
  try {
    const raw = localStorage.getItem("controle_solaire_db");
    return raw ? JSON.parse(raw) : INITIAL_CONTROLES;
  } catch { return INITIAL_CONTROLES; }
}
function saveControles(controles) {
  try { localStorage.setItem("controle_solaire_db", JSON.stringify(capas)); } catch {}
}

// Trouve les capas compatibles avec les exigences
function findControles(tl_min, fs_max, ug_max, controles) {
  return controles.filter(c =>
    (!tl_min || c.tl >= tl_min) &&
    (!fs_max || c.fs <= fs_max) &&
    (!ug_max || c.ug <= ug_max)
  ).sort((a, b) => b.tl - a.tl);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function getDB() {
  try {
    const raw = localStorage.getItem("vitrage_db");
    return raw ? JSON.parse(raw) : INITIAL_DB;
  } catch {
    return INITIAL_DB;
  }
}
function saveDB(db) {
  try { localStorage.setItem("vitrage_db", JSON.stringify(db)); } catch {}
}


// Calcule la correction dimensionnelle (règle extrapolation DTU 39)
function correctionDim(largeur, hauteur, dim_L_test, dim_H_test) {
  if (!largeur || !hauteur || largeur <= 0 || hauteur <= 0) {
    return { correction: 0, ratio: null, label: "Dimensions non saisies" };
  }
  const surf_projet = (largeur / 1000) * (hauteur / 1000);
  const surf_test   = (dim_L_test / 1000) * (dim_H_test / 1000);
  const ratio = surf_projet / surf_test;
  if (ratio <= 1.0) return { correction:  0, ratio, label: "≤ surface testée — direct" };
  if (ratio <= 1.5) return { correction: -1, ratio, label: "1×–1.5× → −1 dB" };
  if (ratio <= 2.0) return { correction: -2, ratio, label: "1.5×–2× → −2 dB" };
  return               { correction: -3, ratio, label: "> 2× → −3 dB" };
}

function findMatches(systemeId, rw_requis, type_chassis, largeur, hauteur, db) {
  const sys = db.systemes.find(s => s.id === systemeId);
  if (!sys) return { sys: null, matches: [] };

  const surf_projet = (largeur && hauteur && largeur > 0 && hauteur > 0)
    ? (largeur / 1000) * (hauteur / 1000) : null;

  // Pour chaque composition, trouver le MEILLEUR rapport :
  // 1. Priorité au rapport dont la surface testée >= surface projet (correction 0 dB)
  // 2. Sinon le rapport avec la plus grande surface testée (correction minimale)
  const bestPerCompo = {};

  for (const test of sys.tests) {
    const chassisOk = !type_chassis || test.type_chassis.toLowerCase().includes(type_chassis.toLowerCase());
    const dc = correctionDim(largeur, hauteur, test.dim_L, test.dim_H);
    const surf_test = (test.dim_L / 1000) * (test.dim_H / 1000);

    for (const v of test.vitrages) {
      const key = v.composition;
      const rw_corrige = v.rw + dc.correction;
      const candidate = { ...v, rw_corrige, dimCorr: dc, surf_test, test, systeme: sys, chassisOk };

      if (!bestPerCompo[key]) {
        bestPerCompo[key] = candidate;
      } else {
        const prev = bestPerCompo[key];
        // Si dimensions renseignées : préférer rapport avec surf_test >= surf_projet
        if (surf_projet) {
          const newCoversProject = surf_test >= surf_projet;
          const prevCoversProject = prev.surf_test >= surf_projet;
          if (newCoversProject && !prevCoversProject) {
            bestPerCompo[key] = candidate; // nouveau couvre le projet, pas l'ancien
          } else if (newCoversProject && prevCoversProject) {
            // Les deux couvrent : prendre le plus petit (moins de correction inutile)
            if (surf_test < prev.surf_test) bestPerCompo[key] = candidate;
          } else if (!newCoversProject && !prevCoversProject) {
            // Aucun ne couvre : prendre le plus grand (correction minimale)
            if (surf_test > prev.surf_test) bestPerCompo[key] = candidate;
          }
        } else {
          // Pas de dimensions projet : prendre le plus grand rapport
          if (surf_test > prev.surf_test) bestPerCompo[key] = candidate;
        }
      }
    }
  }

  const matches = Object.values(bestPerCompo)
    .filter(m => m.rw_corrige >= rw_requis)
    .sort((a, b) => a.rw_corrige - b.rw_corrige);

  return { sys, matches };
}


// ── COMPOSANTS UI ─────────────────────────────────────────────────────────────
const Badge = ({ color, children }) => {
  const colors = {
    green:  { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    amber:  { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
    red:    { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
    blue:   { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
    gray:   { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      letterSpacing: "0.03em"
    }}>{children}</span>
  );
};

// ── PAGE RECHERCHE ────────────────────────────────────────────────────────────
function PageRecherche({ db }) {
  const marques = [...new Set(db.systemes.map(s => s.marque))];
  const [marqueActive, setMarqueActive] = useState(marques[0] || "");
  const gammesMarque = db.systemes.filter(s => s.marque === marqueActive);
  const [systemeId, setSystemeId] = useState(() => db.systemes[0]?.id || "");
  const [typologies, setTypologies] = useState([{ id: 1, label: "Type A", chassis: "", rw: 36, largeur: "", hauteur: "" }]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projetNom, setProjetNom] = useState("");

  const addTypo = () => {
    const id = Date.now();
    setTypologies(t => [...t, { id, label: `Type ${String.fromCharCode(65 + t.length)}`, chassis: "", rw: 36 }]);
  };
  const removeTypo = (id) => setTypologies(t => t.filter(x => x.id !== id));
  const updateTypo = (id, key, val) => setTypologies(t => t.map(x => x.id === id ? { ...x, [key]: val } : x));

  const analyser = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const res = typologies.map(typo => {
      const { sys, matches } = findMatches(systemeId, typo.rw, typo.chassis, +typo.largeur, +typo.hauteur, db);
      const best = matches.find(m => m.chassisOk) || matches[0];
      const conformes = matches.filter(m => m.chassisOk);
      return { typo, sys, best, conformes, allMatches: matches };
    });
    setResults(res);
    setLoading(false);
  };

  const sys = db.systemes.find(s => s.id === systemeId);
  const chassisTypes = sys ? [...new Set(sys.tests.map(t => t.type_chassis))] : [];

  return (
    <div>
      {/* En-tête projet */}
      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Nom du projet</label>
        <input
          value={projetNom}
          onChange={e => setProjetNom(e.target.value)}
          placeholder="Ex: Résidence Les Acacias — Marseille"
          style={inputStyle}
        />
      </div>

      {/* Marque + Gamme */}
      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Marque</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {marques.map(m => (
            <button key={m} onClick={() => {
              setMarqueActive(m);
              const first = db.systemes.find(s => s.marque === m);
              if (first) setSystemeId(first.id);
            }} style={{
              padding: "9px 22px", borderRadius: 8, fontSize: 14, fontWeight: 700,
              cursor: "pointer", transition: "all 0.15s",
              background: marqueActive === m ? "#1a1a2e" : "#f8f8f8",
              color: marqueActive === m ? "#fff" : "#374151",
              border: marqueActive === m ? "2px solid #1a1a2e" : "2px solid #e5e7eb",
            }}>{m}</button>
          ))}
        </div>
        <label style={labelStyle}>Gamme</label>
        <select
          value={systemeId}
          onChange={e => setSystemeId(e.target.value)}
          style={{ ...inputStyle, fontWeight: 600, color: "#4f46e5", borderColor: "#c7d2fe", background: "#f1f0ff" }}
        >
          {db.systemes.filter(s => s.marque === marqueActive).map(s => (
            <option key={s.id} value={s.id}>{s.nom} — {s.famille}</option>
          ))}
        </select>
        {sys && (
          <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
            DTA {sys.dta} · Validité {sys.validite} · Épaisseur {sys.epaisseur_min}–{sys.epaisseur_max}mm
          </div>
        )}
      </div>

      {/* Typologies */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Typologies acoustiques du projet</label>
          <button onClick={addTypo} style={btnSecondaryStyle}>+ Ajouter une typologie</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {typologies.map((typo, i) => (
            <div key={typo.id} style={{
              display: "flex", flexDirection: "column", gap: 10,
              background: "#f9fafb", border: "1px solid #e5e7eb",
              borderRadius: 12, padding: "14px 18px"
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr auto", gap: 10, alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Label</div>
                  <input
                    value={typo.label}
                    onChange={e => updateTypo(typo.id, "label", e.target.value)}
                    placeholder="Type A"
                    style={{ ...inputStyle, margin: 0, fontWeight: 700 }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Type de châssis</div>
                  <select
                    value={typo.chassis}
                    onChange={e => updateTypo(typo.id, "chassis", e.target.value)}
                    style={{ ...inputStyle, margin: 0 }}
                  >
                    <option value="">Tous types</option>
                    {chassisTypes.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                    Rw requis ≥ <strong style={{ color: "#1a1a2e" }}>{typo.rw} dB</strong>
                  </div>
                  <input
                    type="range" min={28} max={52} value={typo.rw}
                    onChange={e => updateTypo(typo.id, "rw", +e.target.value)}
                    style={{ width: "100%", accentColor: "#1a1a2e" }}
                  />
                </div>
                {typologies.length > 1 && (
                  <button onClick={() => removeTypo(typo.id)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#d1d5db", fontSize: 20, padding: 4,
                    borderRadius: 6, lineHeight: 1
                  }}>×</button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Largeur menuiserie (mm)</div>
                  <input
                    type="number" value={typo.largeur} placeholder="ex: 1200"
                    onChange={e => updateTypo(typo.id, "largeur", e.target.value)}
                    style={{ ...inputStyle, margin: 0 }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Hauteur menuiserie (mm)</div>
                  <input
                    type="number" value={typo.hauteur} placeholder="ex: 2200"
                    onChange={e => updateTypo(typo.id, "hauteur", e.target.value)}
                    style={{ ...inputStyle, margin: 0 }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 2 }}>
                  {typo.largeur && typo.hauteur ? (
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      Surface : <strong>{((+typo.largeur/1000)*(+typo.hauteur/1000)).toFixed(2)} m²</strong>
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>
                      Dimensions optionnelles — correction auto si renseignées
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={analyser} disabled={loading || !sys} style={btnPrimaryStyle}>
        {loading ? "Analyse en cours…" : "🔍 Analyser le projet"}
      </button>

      {/* Résultats */}
      {results && (
        <div style={{ marginTop: 36 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
            paddingBottom: 16, borderBottom: "2px solid #e5e7eb"
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
              {projetNom || "Résultats d'analyse"}
            </div>
            <Badge color={results.every(r => r.best) ? "green" : "red"}>
              {results.every(r => r.best) ? "✓ Toutes les exigences couvertes" : "⚠ Exigences non couvertes"}
            </Badge>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {results.map(({ typo, sys, best, conformes }) => (
              <ResultCard key={typo.id} typo={typo} sys={sys} best={best} conformes={conformes} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({ typo, sys, best, conformes }) {
  const [expanded, setExpanded] = useState(true);
  const conforme = !!best;

  return (
    <div style={{
      border: conforme ? "1.5px solid #6ee7b7" : "1.5px solid #fca5a5",
      borderRadius: 14, overflow: "hidden",
      boxShadow: conforme ? "0 2px 12px rgba(16,185,129,0.08)" : "0 2px 12px rgba(239,68,68,0.08)"
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px", cursor: "pointer",
          background: conforme ? "#f0fdf4" : "#fff1f2"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18,
            background: conforme ? "#d1fae5" : "#fee2e2"
          }}>
            {conforme ? "✓" : "✗"}
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{typo.label}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Rw requis ≥ {typo.rw} dB
              {typo.chassis && ` · ${typo.chassis}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {best ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Recommandé</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#065f46", fontFamily: "monospace" }}>
                {best.composition.replace("8mm + ", "")}
              </div>
            </div>
          ) : (
            <Badge color="red">Aucun vitrage conforme</Badge>
          )}
          <span style={{ color: "#9ca3af", fontSize: 18 }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Detail */}
      {expanded && best && (
        <div style={{ padding: "18px 20px", background: "#fff" }}>
          {/* Vitrage recommandé */}
          <div style={{
            background: "#f0fdf4", borderRadius: 10, padding: "14px 18px",
            marginBottom: 16, border: "1px solid #bbf7d0"
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: "0.08em", marginBottom: 8 }}>
              VITRAGE RECOMMANDÉ
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 12 }}>
              <Stat label="Composition" value={best.composition.replace("8mm + ", "")} mono />
              <Stat label="Rw mesuré" value={`${best.rw} dB`} />
              {best.dimCorr && best.dimCorr.correction !== 0 ? (
                <Stat label="Correction dim." value={`${best.dimCorr.correction} dB`} warn />
              ) : (
                <Stat label="Correction dim." value="0 dB" />
              )}
              <Stat label="Rw corrigé" value={`${best.rw_corrige ?? best.rw} dB`} highlight />
              <Stat label="Rw+Ctr" value={`${best.rwctr} dB`} />
            </div>
            {best.dimCorr && best.dimCorr.correction !== 0 && (
              <div style={{
                marginTop: 8, padding: "6px 12px", background: "#fef3c7",
                borderRadius: 8, fontSize: 12, color: "#92400e", border: "1px solid #fcd34d"
              }}>
                ⚠ Correction dimensionnelle appliquée : {best.dimCorr.label}
                {best.dimCorr.ratio && ` (ratio surface : ×${best.dimCorr.ratio.toFixed(2)})`}
              </div>
            )}
            <div style={{ marginTop: 12, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
              <strong>Justification :</strong> Ce vitrage présente un Rw mesuré de {best.rw} dB
              {best.dimCorr && best.dimCorr.correction !== 0 && `, corrigé à ${best.rw_corrige} dB après application de la règle d'extrapolation dimensionnelle (${best.dimCorr.correction} dB)`},
              soit <strong style={{ color: "#059669" }}>+{(best.rw_corrige ?? best.rw) - typo.rw} dB</strong> par rapport à l'exigence de {typo.rw} dB.
              Testé par {best.test.labo} ({best.test.date}), rapport n° {best.test.rapport},
              sur châssis {sys.nom} — {best.test.type_chassis} ({best.test.dim_L} × {best.test.dim_H} mm).
            </div>
          </div>

          {/* Alternatives */}
          {conformes.length > 1 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.08em", marginBottom: 8 }}>
                ALTERNATIVES CONFORMES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {conformes.slice(1).map((v, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 14px", background: "#f9fafb", borderRadius: 8,
                    border: "1px solid #e5e7eb", fontSize: 13
                  }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#374151" }}>
                      {v.composition.replace("8mm + ", "")}
                    </span>
                    <div style={{ display: "flex", gap: 16, color: "#6b7280" }}>
                      <span>Rw <strong style={{ color: "#1a1a2e" }}>{v.rw}</strong></span>
                      <span>Rw+C <strong>{v.rwc}</strong></span>
                      <span>Rw+Ctr <strong>{v.rwctr}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, mono, highlight, warn }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>{label}</div>
      <div style={{
        fontWeight: 700, fontSize: 16,
        fontFamily: mono ? "monospace" : "inherit",
        color: highlight ? "#059669" : warn ? "#b45309" : "#1a1a2e"
      }}>{value}</div>
    </div>
  );
}

// ── PAGE BASE ─────────────────────────────────────────────────────────────────
function PageBase({ db, onUpdate }) {
  const marques = [...new Set(db.systemes.map(s => s.marque))];
  const [marqueActive, setMarqueActive] = useState(marques[0] || "");
  const [selected, setSelected] = useState(db.systemes[0]?.id);
  const sys = db.systemes.find(s => s.id === selected);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {marques.map(m => (
          <button key={m} onClick={() => {
            setMarqueActive(m);
            const first = db.systemes.find(s => s.marque === m);
            if (first) setSelected(first.id);
          }} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
            cursor: "pointer",
            background: marqueActive === m ? "#1a1a2e" : "#f3f4f6",
            color: marqueActive === m ? "#fff" : "#374151",
            border: marqueActive === m ? "2px solid #1a1a2e" : "2px solid #e5e7eb",
          }}>{m}</button>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          style={{ ...inputStyle, fontWeight: 600, color: "#4f46e5", borderColor: "#c7d2fe", background: "#f1f0ff" }}
        >
          {db.systemes.filter(s => s.marque === marqueActive).map(s => (
            <option key={s.id} value={s.id}>{s.nom} — {s.famille}</option>
          ))}
        </select>
      </div>

      {sys && (
        <div>
          <div style={{
            background: "#f9fafb", borderRadius: 12, padding: "16px 20px",
            marginBottom: 24, border: "1px solid #e5e7eb"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Stat label="Marque" value={sys.marque} />
              <Stat label="Famille" value={sys.famille} />
              <Stat label="DTA" value={sys.dta} mono />
              <Stat label="Validité DTA" value={sys.validite} />
            </div>
          </div>

          {sys.tests.map((test, ti) => (
            <div key={ti} style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 10
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{test.type_chassis}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Rapport {test.rapport} · {test.labo} {test.date} · {test.dim_L}×{test.dim_H} mm
                  </div>
                </div>
                <Badge color="blue">PV certifié</Badge>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#1a1a2e", color: "#fff" }}>
                    {["Composition", "Rw", "Rw+C", "Rw+Ctr"].map(h => (
                      <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {test.vitrages.map((v, vi) => (
                    <tr key={vi} style={{ background: vi % 2 === 0 ? "#fff" : "#f9fafb" }}>
                      <td style={{ padding: "9px 14px", fontFamily: "monospace", fontWeight: 600, color: "#374151" }}>
                        {v.composition.replace("8mm + ", "")}
                      </td>
                      <td style={{ padding: "9px 14px", fontWeight: 700, color: "#1a1a2e" }}>{v.rw} dB</td>
                      <td style={{ padding: "9px 14px", color: "#374151" }}>{v.rwc} dB</td>
                      <td style={{ padding: "9px 14px", color: "#374151" }}>{v.rwctr} dB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Tableau AEV */}
          {sys.aev && sys.aev.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                Classements AEV certifiés — {sys.aev.length} essai{sys.aev.length > 1 ? "s" : ""}
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#0f3460", color: "#fff" }}>
                    {["Châssis", "Dimensions", "Air", "Eau", "Vent", "Rapport", "Date"].map(h => (
                      <th key={h} style={{ padding: "7px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sys.aev.map((a, ai) => (
                    <tr key={ai} style={{ background: ai % 2 === 0 ? "#fff" : "#f0f4ff" }}>
                      <td style={{ padding: "8px 12px", color: "#374151" }}>{a.chassis}</td>
                      <td style={{ padding: "8px 12px", fontFamily: "monospace", color: "#374151" }}>{a.dims}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: "#1e40af" }}>{a.A}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: "#1e40af" }}>{a.E}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: "#1e40af" }}>{a.V}</td>
                      <td style={{ padding: "8px 12px", fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{a.rapport}</td>
                      <td style={{ padding: "8px 12px", fontSize: 12, color: "#6b7280" }}>{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── PAGE AJOUTER ──────────────────────────────────────────────────────────────
function PageAjouter({ db, onUpdate }) {
  const [mode, setMode] = useState("ia");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [pdfText, setPdfText] = useState("");

  const analyserAvecIA = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const content = mode === "pdf" ? pdfText : prompt;
    if (!content.trim()) { setLoading(false); return; }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Tu es un expert en vitrages de menuiserie aluminium. Extrait UNIQUEMENT les données acoustiques de ce texte/rapport et retourne un JSON strictement valide (sans markdown, sans explication), au format exact suivant:
{
  "id": "identifiant_unique_sans_espaces",
  "nom": "nom commercial",
  "marque": "fabricant",
  "famille": "Fenêtre|Porte|Façade",
  "dta": "numéro DTA",
  "validite": "date validité",
  "epaisseur_min": nombre,
  "epaisseur_max": nombre,
  "poids_max": nombre,
  "tests": [
    {
      "rapport": "numéro rapport",
      "type_chassis": "description",
      "dim_L": nombre_mm,
      "dim_H": nombre_mm,
      "labo": "nom labo",
      "date": "année",
      "vitrages": [
        { "composition": "description", "rw": nombre, "rwc": nombre, "rwctr": nombre }
      ]
    }
  ],
  "thermique": []
}

Texte à analyser:
${content}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setError("Impossible d'analyser. Vérifiez que le texte contient bien des données de rapport acoustique.");
    }
    setLoading(false);
  };

  const confirmerAjout = () => {
    if (!result) return;
    const exists = db.systemes.find(s => s.id === result.id);
    const newDB = {
      ...db,
      systemes: exists
        ? db.systemes.map(s => s.id === result.id ? result : s)
        : [...db.systemes, result]
    };
    onUpdate(newDB);
    setResult(null);
    setPrompt("");
    setPdfText("");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[["ia", "✏️ Saisie libre"], ["pdf", "📄 Coller texte PDF"]].map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: mode === m ? "#1a1a2e" : "#f3f4f6",
            color: mode === m ? "#fff" : "#374151",
            border: mode === m ? "2px solid #1a1a2e" : "2px solid #e5e7eb",
          }}>{l}</button>
        ))}
      </div>

      {mode === "ia" ? (
        <div>
          <label style={labelStyle}>Décris le système ou colle les données acoustiques</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={"Ex: Schüco AWS 60, rapport BEB2.C.6053-3, oscillobattant 1250x2500mm, CEBTP 2015\n4/16/4 → Rw 34, Rw+C 33, Rw+Ctr 30\n4/16/44.2S → Rw 38, Rw+C 37, Rw+Ctr 33\n10/12/44.2S → Rw 41, Rw+C 40, Rw+Ctr 37"}
            rows={7}
            style={{ ...inputStyle, fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
      ) : (
        <div>
          <label style={labelStyle}>Colle ici le texte copié depuis ton PDF DTA</label>
          <textarea
            value={pdfText}
            onChange={e => setPdfText(e.target.value)}
            placeholder="Sélectionne et copie le tableau de résultats acoustiques de ton PDF, puis colle-le ici..."
            rows={10}
            style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12 }}
          />
        </div>
      )}

      <button
        onClick={analyserAvecIA}
        disabled={loading || (!prompt.trim() && !pdfText.trim())}
        style={{ ...btnPrimaryStyle, marginTop: 16 }}
      >
        {loading ? "Analyse IA en cours…" : "🤖 Analyser avec l'IA"}
      </button>

      {error && (
        <div style={{
          marginTop: 16, padding: "12px 16px", background: "#fff1f2",
          border: "1px solid #fca5a5", borderRadius: 10, color: "#991b1b", fontSize: 13
        }}>{error}</div>
      )}

      {result && (
        <div style={{
          marginTop: 20, background: "#f0fdf4", border: "1.5px solid #6ee7b7",
          borderRadius: 14, padding: "18px 20px"
        }}>
          <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 12 }}>
            ✓ Données extraites — {result.nom} ({result.marque})
          </div>
          <div style={{ fontSize: 12, color: "#374151", marginBottom: 6 }}>
            {result.tests?.length || 0} rapport(s) · {result.tests?.reduce((a, t) => a + t.vitrages.length, 0) || 0} composition(s) de vitrage
          </div>
          {result.tests?.map((t, i) => (
            <div key={i} style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>
              <strong>{t.type_chassis}</strong> — {t.vitrages.map(v => `${v.composition.replace("8mm + ", "")} (Rw ${v.rw})`).join(", ")}
            </div>
          ))}
          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <button onClick={confirmerAjout} style={btnPrimaryStyle}>✓ Ajouter à la base</button>
            <button onClick={() => setResult(null)} style={btnSecondaryStyle}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── STYLES PARTAGÉS ───────────────────────────────────────────────────────────
const labelStyle = {
  display: "block", fontSize: 12, fontWeight: 700,
  color: "#374151", letterSpacing: "0.06em",
  textTransform: "uppercase", marginBottom: 8
};
const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14,
  border: "1.5px solid #e5e7eb", outline: "none", background: "#fff",
  color: "#1a1a2e", boxSizing: "border-box", marginBottom: 0,
  fontFamily: "inherit"
};
const btnPrimaryStyle = {
  padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700,
  cursor: "pointer", background: "#1a1a2e", color: "#fff",
  border: "none", letterSpacing: "0.02em", transition: "opacity 0.15s"
};
const btnSecondaryStyle = {
  padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600,
  cursor: "pointer", background: "#f3f4f6", color: "#374151",
  border: "1.5px solid #e5e7eb"
};


// ── PAGE CAPAS ────────────────────────────────────────────────────────────────
function PageControleSolaire() {
  const [controles] = useState(() => getControles());
  const [tl_min, setTlMin] = useState("");
  const [fs_max, setFsMax] = useState("");
  const [ug_max, setUgMax] = useState("");
  const [marqueFilter, setMarqueFilter] = useState("");
  const [results, setResults] = useState(null);

  const marques = [...new Set(controles.map(c => c.marque))];
  const gammes = [...new Set(controles.filter(c => !marqueFilter || c.marque === marqueFilter).map(c => c.gamme))];

  const chercher = () => {
    let filtered = findControles(+tl_min || 0, +fs_max || 99, +ug_max || 99, controles);
    if (marqueFilter) filtered = filtered.filter(c => c.marque === marqueFilter);
    setResults(filtered);
  };

  return (
    <div>
      <div style={{ marginBottom: 24, padding: "16px 20px", background: "#f0f9ff", borderRadius: 12, border: "1px solid #bae6fd" }}>
        <div style={{ fontSize: 13, color: "#0369a1", fontWeight: 600, marginBottom: 4 }}>Recherche de contrôle solaire</div>
        <div style={{ fontSize: 12, color: "#0369a1" }}>Renseignez vos exigences thermiques et solaires pour trouver le contrôle solaire adapté.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Marque</label>
          <select value={marqueFilter} onChange={e => setMarqueFilter(e.target.value)} style={inputStyle}>
            <option value="">Toutes marques</option>
            {marques.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>TL minimum (%)</label>
          <input type="number" value={tl_min} onChange={e => setTlMin(e.target.value)}
            placeholder="ex: 60" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Facteur solaire max</label>
          <input type="number" step="0.01" value={fs_max} onChange={e => setFsMax(e.target.value)}
            placeholder="ex: 0.35" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Ug max (W/m².K)</label>
          <input type="number" step="0.1" value={ug_max} onChange={e => setUgMax(e.target.value)}
            placeholder="ex: 1.1" style={inputStyle} />
        </div>
      </div>

      <button onClick={chercher} style={btnPrimaryStyle}>☀ Trouver le contrôle solaire</button>

      {results && (
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
            {results.length} référence{results.length > 1 ? "s" : ""} conforme{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
          </div>
          {results.length === 0 && (
            <div style={{ padding: "20px", background: "#fff1f2", borderRadius: 10, color: "#991b1b", fontSize: 13 }}>
              Aucune référence ne correspond à ces exigences. Essayez d'assouplir les critères.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((c, i) => (
              <div key={c.id} style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr",
                gap: 12, alignItems: "center",
                padding: "14px 18px", borderRadius: 12,
                background: i === 0 ? "#f0fdf4" : "#f9fafb",
                border: i === 0 ? "1.5px solid #6ee7b7" : "1px solid #e5e7eb"
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{c.ref}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{c.marque} · {c.gamme}</div>
                </div>
                <Stat label="TL" value={`${c.tl}%`} highlight={i === 0} />
                <Stat label="Facteur solaire" value={c.fs} highlight={i === 0} />
                <Stat label="Ug" value={`${c.ug} W/m².K`} />
                <div style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tableau complet */}
      <div style={{ marginTop: 36 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Base complète — {controles.length} références
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#1a1a2e", color: "#fff" }}>
              {["Référence", "Marque", "Gamme", "TL %", "FS", "Ug", "Note"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {controles.map((c, i) => (
              <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "8px 12px", fontWeight: 600, color: "#1a1a2e" }}>{c.ref}</td>
                <td style={{ padding: "8px 12px", color: "#374151" }}>{c.marque}</td>
                <td style={{ padding: "8px 12px", color: "#374151" }}>{c.gamme}</td>
                <td style={{ padding: "8px 12px", fontWeight: 700, color: "#059669" }}>{c.tl}%</td>
                <td style={{ padding: "8px 12px" }}>{c.fs}</td>
                <td style={{ padding: "8px 12px" }}>{c.ug}</td>
                <td style={{ padding: "8px 12px", color: "#6b7280", fontSize: 12 }}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── APP PRINCIPALE ────────────────────────────────────────────────────────────
export default function App() {
  const [db, setDB] = useState(() => getDB());
  const [controles, setControles] = useState(() => getControles());
  const [page, setPage] = useState("recherche");

  const handleUpdate = (newDB) => {
    setDB(newDB);
    saveDB(newDB);
  };

  const pages = [
    { id: "recherche", label: "Recherche vitrage", icon: "🔍" },
    { id: "controle", label: "Contrôle solaire", icon: "☀" },
    { id: "base", label: "Ma base", icon: "📚" },
    { id: "ajouter", label: "Ajouter un système", icon: "＋" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f8f9fb" }}>
      {/* Header */}
      <div style={{
        background: "#1a1a2e", color: "#fff", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>🪟</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>Assistant Vitrage</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Sélection acoustique intelligente</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {pages.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} style={{
              padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "none", transition: "all 0.15s",
              background: page === p.id ? "rgba(255,255,255,0.12)" : "transparent",
              color: page === p.id ? "#fff" : "rgba(255,255,255,0.55)",
            }}>
              {p.icon} {p.label}
            </button>
          ))}
        </nav>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          {db.systemes.length} système{db.systemes.length > 1 ? "s" : ""} en base
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {page === "recherche" && <PageRecherche db={db} />}
        {page === "controle" && <PageControleSolaire />}
        {page === "base" && <PageBase db={db} onUpdate={handleUpdate} />}
        {page === "ajouter" && <PageAjouter db={db} onUpdate={handleUpdate} />}
      </div>
    </div>
  );
}
